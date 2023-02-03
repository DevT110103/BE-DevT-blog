import { Request, Response } from 'express';
import { FindOptions } from 'sequelize';

import { Response as ResponseInterface } from '../../interfaces';
import { ResponseProduct } from '../../interfaces/product.interface';
import { Product } from '../../interfaces';

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
        let data = (await db.Product.findAll()) as Product;
        response.data = data;
        resolve(response);
      } catch (e) {
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
