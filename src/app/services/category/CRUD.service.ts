import { Request } from 'express';
import { unlink } from 'fs';

import getItem from '../components/components';
import logger from '../../../utils/logger';
import resultResponse from '../../../utils/response';
import Category from '../../../database/models/category';
import { Model } from 'sequelize';
import { CategoryModel } from '../../../interfaces/category.interface';
import component from '../components';

class CRUDCategory {
  getAllCategories(req: Request) {
    const categories = component.getItem(req, Category);
    return categories;
  }

  createCategory(req: Request) {
    return new Promise(async (resolve, reject) => {
      const name: string = req.body.nameCategory.trim();
      const image = req.file;
      try {
        const isExistsName = await Category.findOne({
          where: {
            name,
          },
        });

        if (!name || !image || isExistsName) {
          if (isExistsName && image) {
            unlink(`./src/public/uploads/${image.filename}`, (err) => {});
          }
          reject(resultResponse('Failed', {}, 500));
        } else {
          const thumbnail = component.setUrlThumbnail(image);
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
            const category = await Category.findByPk(id);
            const pathImgOld = String(category?.dataValues.thumbnail).split('/').pop();
            unlink(`./src/public/uploads/${pathImgOld}`, (err) => {});

            await category?.destroy();

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
        if (id <= 0 || isNaN(id)) {
          if (file) {
            unlink(`./src/public/uploads/${file.filename}`, (err) => {});
          }
          return reject(resultResponse('Id is valid', {}, 500));
        }

        const category = (await Category.findByPk(id)) as Model<CategoryModel>;

        if (!category) {
          return reject(resultResponse('Id is valid', {}, 404));
        }

        if (name && file) {
          const pathImgOld = String(category.dataValues.thumbnail).split('/').pop();

          await unlink(`./src/public/uploads/${pathImgOld}`, (err) => {});

          const thumbnail = component.setUrlThumbnail(file);

          await category.update({ name, thumbnail });
          return resolve(resultResponse('Update success', {}));
        }
        if (name) {
          await category.update({ name });
          return resolve(resultResponse('Update success', {}));
        }

        if (file) {
          const pathImgOld = String(category.dataValues.thumbnail).split('/').pop();

          await unlink(`./src/public/uploads/${pathImgOld}`, (err) => {});

          const thumbnail = component.setUrlThumbnail(file);

          await category.update({ thumbnail });

          return resolve(resultResponse('Update success', {}));
        }

        return reject(resultResponse('Update failed', {}, 500));
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          logger.error(e);
        }
        if (file) {
          await unlink(`./src/public/uploads/${file.filename}`, (err) => {});
        }
        return reject(resultResponse('Update Failed', {}, 500));
      }
    });
  }
}

export default new CRUDCategory();
