import { Request } from 'express';
import { unlink } from 'fs';

import { sequelize } from '../../../configs/connectDatabase';
import { CategoryDB } from '../../../interfaces/category.interface';
import getItem from '../components/getItem';
import { replaceStringUnicode } from '../../middlewares/Uploads.middlewares';
const db = require('../../../database/models');

const response = {
  status: 200,
  error: false,
  message: 'Successfully!',
  data: {},
};
class CRUDCategory {
  getAllCategories(req: Request) {
    const query = 'select * from categories';
    return getItem(req, db.Category, query);
  }

  createCategory(req: Request) {
    return new Promise(async (resolve, reject) => {
      const response = {
        status: 200,
        error: false,
        message: 'Successfully!',
        data: {},
      };

      try {
        const name = req.body.nameCategory;
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

          response.status = 400;
          response.data = {};
          response.error = true;
          response.message = 'Failed';
          reject(response);
        } else {
          let path: string = '';
          if (process.env.NODE_ENV === 'development') {
            path = `http://127.0.0.1:8080/uploads/${image.filename}`;
          } else {
            path = ``;
          }
          const thumbnail = path;

          const data = await db.Category.create({ name, thumbnail });
          response.data = data as CategoryDB;
          resolve(response);
        }
      } catch (e) {
        response.status = 400;
        response.error = true;
        response.message = 'Create failed';
        response.data = {};
        reject(response);
      }
    });
  }

  getAllProduct(req: Request) {
    return new Promise(async (resolve, reject) => {
      const response = {
        status: 200,
        error: false,
        message: 'Successfully!',
        data: {},
      };

      const id: number = Number(req.query.id);

      try {
        if (!id || id <= 0 || isNaN(id)) {
          response.status = 400;
          response.error = true;
          response.message = 'id is valid';
          response.data = {};
          reject(response);
        } else {
          const query =
            'SELECT products.id, products.title, products.sub_title, products.thumbnail, products.desc,products.createdAt,products.updatedAt ' +
            `FROM products INNER JOIN categories ON products.category_id = categories.id WHERE category_id = ${id}`;

          const [result] = await sequelize.query(query);

          if (result.length <= 0) {
            response.message = 'List empty';
          }

          response.data = result;
          resolve(response);
        }
      } catch {
        response.status = 400;
        response.error = true;
        response.data = {};
        response.message = 'Get category failed';
        reject(response);
      }
    });
  }
}

export default new CRUDCategory();
