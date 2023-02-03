import { Request, Response } from 'express';
import { FindOptions } from 'sequelize';

import { Response as ResponseInterface } from '../../interfaces';
import { ResponseProduct } from '../../interfaces/product.interface';
import { Product } from '../../interfaces';
import { sequelize } from '../../configs/connectDatabase';

const db = require('../../database/models');

const response = {
  status: 200,
  error: false,
  message: 'Successfully!',
  data: {},
};

class ProductService {
  getAllProducts(req: Request, res: Response) {
    return new Promise(async (resolve, reject) => {
      try {
        let result;
        let query = '';
        const idCategory: number = Number(req.query.id_category);

        if (idCategory <= 0 || !idCategory) {
          query = 'select  *  from products';
          result = await sequelize.query(query);
        } else {
          query =
            'SELECT products.id, title, products.sub_title, products.desc, categories.name AS category_name, thumbnail, products.createdAt, products.updatedAt ';
          query += 'FROM products INNER JOIN categories ON products.category_id = categories.id INNER JOIN thumbnails ';
          query += `ON products.thumbnail_id = thumbnails.id WHERE category_id = ${idCategory};`;
          result = await sequelize.query(query);
        }
        if (result[0].length <= 0) {
          response.message = 'List empty';
        }
        response.data = result[0];
        resolve(response);
      } catch (e) {
        console.log('ERROR ->', e);

        response.status = 400;
        response.error = true;
        response.message = 'Failed';
        reject(response);
      }
    });
  }

  createProduct(req: Request, res: Response) {
    return new Promise(async (resolve, reject) => {
      try {
        const name: string = req.body.name;
        if (name.length > 0) {
          const newProduct = new db.Product();
          newProduct.name = name;
          newProduct.save();

          response.data = newProduct;
          resolve(response);
        } else {
          response.status = 400;
          response.error = true;
          response.message = 'name is empty';
          reject(response);
        }
      } catch (e) {
        response.status = 400;
        response.error = true;
        response.message = 'Failed';
        reject(response);
      }
    });
  }
}

export default new ProductService();
