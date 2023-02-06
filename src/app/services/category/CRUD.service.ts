import { Request } from 'express';

import { sequelize } from '../../../configs/connectDatabase';
import { CategoryDB } from '../../../interfaces/category.interface';
import getItem from '../components/getItem';
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

      const nameCategory: string = req.body.name;
      const thumbnailCategory: string = req.body.thumbnail;
      const isExistsName = await db.Category.count({
        where: {
          name: nameCategory,
        },
      });

      try {
        if (!nameCategory) {
          response.status = 400;
          response.error = true;
          response.message = 'Name is empty';
          reject(response);
        } else if (!thumbnailCategory) {
          response.status = 400;
          response.error = true;
          response.message = 'Thumbnail ID is valid';
          reject(response);
        } else if (isExistsName >= 1) {
          response.status = 400;
          response.error = true;
          response.message = 'Name category is exists';
          response.data = {};
          reject(response);
        } else {
          const newCategory = new db.Category();
          newCategory.name = nameCategory;
          newCategory.thumbnail = thumbnailCategory;
          await newCategory.save();
          response.data = newCategory as CategoryDB;
          resolve(response);
        }
      } catch (e) {
        console.log('e ->', e);

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
