import { Request } from 'express';
import { unlink } from 'fs';

import getItem from '../components/getItem';
import logger from '../../../utils/logger';
import resultResponse from '../../../utils/response';
const db = require('../../../database/models');

class CRUDCategory {
  getAllCategories(req: Request) {
    const query = 'select * from categories';
    return getItem(req, db.Category, query);
  }

  createCategory(req: Request) {
    return new Promise(async (resolve, reject) => {
      try {
        const name: string = req.body.nameCategory.trim();
        const image = req.file;

        const isExistsName = await db.Category.findOne({
          where: {
            name: name,
          },
        });

        if (!name || !image || isExistsName) {
          if (isExistsName && image) {
            unlink(`./src/public/uploads/${image.filename}`, (err) => {});
          }
          reject(resultResponse('Failed', {}, 500));
        } else {
          let path: string = '';
          if (process.env.NODE_ENV === 'development') {
            path = `http://127.0.0.1:8080/uploads/${image.filename}`;
          } else {
            path = ``;
          }
          const thumbnail = path;

          const data = await db.Category.create({ name, thumbnail });

          resolve(resultResponse('Success', data));
        }
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          logger.error(e);
        }
        reject(resultResponse('Failed', {}, 500));
      }
    });
  }

  deleteCategories(req: Request) {
    return new Promise(async (resolve, reject) => {
      const id: number = Number(req.query.id);
      try {
        if (id <= 0 || isNaN(id)) {
          reject(resultResponse('Id Is Valid', {}, 404));
        } else {
          const countExists = await db.Category.count({
            where: {
              id,
            },
          });

          if (countExists <= 0) {
            reject(resultResponse('Category is not exists', {}, 400));
          } else {
            const category = await db.Category.findAll({ where: { id } });
            const pathImgOld = String(category[0].thumbnail).split('/')[String(category[0].thumbnail).split('/').length - 1];
            unlink(`./src/public/uploads/${pathImgOld}`, (err) => {});

            await db.Category.destroy({
              where: {
                id: id,
              },
            });
            resolve(resultResponse('Delete success', {}));
          }
        }
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          logger.error(e);
        }

        reject(resultResponse('Delete Failed', {}, 500));
      }
    });
  }

  updateCategory(req: Request) {
    return new Promise(async (resolve, reject) => {
      const name = req.body.nameCategory;
      const file = req.file;
      const id = Number(req.query.id);

      try {
        if (id <= 0 && file) {
          reject(resultResponse('Id is valid', {}, 500));
          unlink(`./src/public/uploads/${file.filename}`, (err) => {});
        } else if (!name && file) {
          reject(resultResponse('Name is valid', {}, 500));
          unlink(`./src/public/uploads/${file.filename}`, (err) => {});
        } else if (!file) {
          reject(resultResponse('Thumbnail is valid', {}, 500));
        } else {
          const category = await db.Category.findAll({ where: { id } });

          if (Array.from(category).length <= 0 || !category) {
            reject(resultResponse('Id is valid', {}, 404));
          } else {
            if (category[0].name === name) {
              reject(resultResponse('Name is exists', {}, 500));
              unlink(`./src/public/uploads/${file.filename}`, (err) => {});
            } else {
              let path: string = '';
              const pathImgOld = String(category[0].thumbnail).split('/')[String(category[0].thumbnail).split('/').length - 1];
              unlink(`./src/public/uploads/${pathImgOld}`, (err) => {});
              if (process.env.NODE_ENV === 'development') {
                path = `http://127.0.0.1:8080/uploads/${file.filename}`;
              } else {
                path = ``;
              }
              const thumbnail = path;
              await db.Category.update({ name, thumbnail }, { where: { id } });
              resolve(resultResponse('Update success', {}));
            }
          }
        }
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          logger.error(e);
        }
        unlink(`./src/public/uploads/${file?.filename}`, (err) => {});
        reject(resultResponse('Update Failed', {}, 500));
      }
    });
  }
}

export default new CRUDCategory();
