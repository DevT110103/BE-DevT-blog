import { Request } from 'express';
import { unlink } from 'fs';

import { Response as ResponseInterface } from '../../../interfaces';
import { CategoryDB } from '../../../interfaces/category.interface';
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
        logger.error(e);
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
            await db.Category.destroy({
              where: {
                id: id,
              },
            });
            resolve(resultResponse('Delete success', {}));
          }
        }
      } catch (e) {
        logger.error(e);

        reject(resultResponse('Delete Failed', {}, 500));
      }
    });
  }

  updateCategory(req: Request) {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (e) {
        logger.error(e);

        reject(resultResponse('Update Failed', {}, 500));
      }
    });
  }
}

export default new CRUDCategory();
