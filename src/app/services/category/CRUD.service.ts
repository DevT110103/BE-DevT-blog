import { Request } from 'express';
import { unlink } from 'fs';

import getItem from '../components/getItem';
import logger from '../../../utils/logger';
import resultResponse from '../../../utils/response';
import Category from '../../../database/models/category';
import { Model } from 'sequelize';
import { CategoryModel } from '../../../interfaces/category.interface';

class CRUDCategory {
  getAllCategories(req: Request) {
    const query = 'select * from categories';
    return getItem(req, Category, query);
  }

  createCategory(req: Request) {
    return new Promise(async (resolve, reject) => {
      try {
        const name: string = req.body.nameCategory.trim();
        const image = req.file;

        const isExistsName = await Category.findOne({
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

          const data = await Category.create({ name, thumbnail });

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
          const countExists = await Category.count({
            where: {
              id,
            },
          });

          if (countExists <= 0) {
            reject(resultResponse('Category is not exists', {}, 400));
          } else {
            const category = await Category.findAll({ where: { id } });
            const pathImgOld = String(category[0].dataValues.thumbnail).split('/')[
              String(category[0].dataValues.thumbnail).split('/').length - 1
            ];
            unlink(`./src/public/uploads/${pathImgOld}`, (err) => {});

            await Category.destroy({
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

  private setUrlThumbnail(file: Express.Multer.File) {
    let path: string = '';
    if (process.env.NODE_ENV === 'development') {
      path = `http://127.0.0.1:8080/uploads/${file.filename}`;
    } else {
      path = ``;
    }

    return path;
  }

  updateCategory(req: Request) {
    return new Promise(async (resolve, reject) => {
      const name = req.body.nameCategory;
      const file = req.file;
      const id = Number(req.query.id);

      try {
        if ((id <= 0 || isNaN(id)) && file) {
          reject(resultResponse('Id is valid', {}, 500));
          unlink(`./src/public/uploads/${file.filename}`, (err) => {});
        } else {
          const categories = (await Category.findAll({ where: { id } })) as Model<CategoryModel>[];

          if (Array.from(categories).length <= 0) {
            reject(resultResponse('Id is valid', {}, 404));
          } else {
            if (!name && file) {
              const pathImgOld = String(categories[0].dataValues.thumbnail).split('/')[
                String(categories[0].dataValues.thumbnail).split('/').length - 1
              ];
              unlink(`./src/public/uploads/${pathImgOld}`, (err) => {});

              const thumbnail = this.setUrlThumbnail(file);
              await Category.update({ thumbnail }, { where: { id } });
              resolve(resultResponse('Update success', {}));
            } else if (name && !file) {
              await Category.update({ name }, { where: { id } });
              resolve(resultResponse('Update success', {}));
            } else if (name && file) {
              let path: string = '';

              const pathImgOld = String(categories[0].dataValues.thumbnail).split('/')[
                String(categories[0].dataValues.thumbnail).split('/').length - 1
              ];

              unlink(`./src/public/uploads/${pathImgOld}`, (err) => {});

              const thumbnail = this.setUrlThumbnail(file);

              await Category.update({ name, thumbnail }, { where: { id } });

              resolve(resultResponse('Update success', {}));
            } else {
              unlink(`./src/public/uploads/${file?.filename}`, (err) => {});

              reject(resultResponse('Update failed', {}, 500));
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
