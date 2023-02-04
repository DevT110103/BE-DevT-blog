import { Request, Response } from 'express';

import { sequelize } from '../../../configs/connectDatabase';
import { CategoryDB } from '../../../interfaces/category.interface';
const db = require('../../../database/models');

const response = {
  status: 200,
  error: false,
  message: 'Successfully!',
  data: {},
};

class CRUDCategory {
  getAllCategories() {
    return new Promise(async (resolve, reject) => {
      try {
        const [result, metadata] = await sequelize.query(
          'SELECT categories.id, name, categories.createdAt, categories.updatedAt, thumbnail FROM `categories` INNER JOIN `thumbnails` ON categories.thumbnail_id = thumbnails.id'
        );
        response.data = result;
        resolve(response);
      } catch (e) {
        response.status = 400;
        response.error = true;
        response.message = 'Get all categories failed';
        reject(response);
      }
    });
  }

  createCategory(req: Request) {
    return new Promise(async (resolve, reject) => {
      const nameCategory: string = req.body.name;
      const thumbnailID: number = Number(req.body.thumbnail_id);
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
        } else if (!thumbnailID || isNaN(thumbnailID) || thumbnailID <= 0) {
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
          newCategory.thumbnail_id = thumbnailID;
          await newCategory.save();
          response.data = newCategory as CategoryDB;
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
}

export default new CRUDCategory();
