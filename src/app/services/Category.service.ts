import { Request, Response } from 'express';

import { sequelize } from '../../configs/connectDatabase';

const response = {
  status: 200,
  error: false,
  message: 'Successfully!',
  data: {},
};

class CategoryService {
  getAllCategories() {
    return new Promise(async (resolve, reject) => {
      try {
        const [result, metadata] = await sequelize.query(
          'SELECT categories.id, name, categories.createdAt, categories.updatedAt, thumbnail FROM `categories` INNER JOIN `thumbnails` ON categories.thumbnail_id = thumbnails.id'
        );
        response.data = result;
        resolve(response);
      } catch (e) {
        console.log('e ->', e);

        response.status = 400;
        response.error = true;
        response.message = 'Get all categories failed';
        reject(response);
      }
    });
  }
}

export default new CategoryService();
