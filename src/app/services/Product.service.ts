import { Request, Response } from 'express';

import { sequelize } from '../../configs/connectDatabase';
import getItem from './components/getItem';

const db = require('../../database/models');

const response = {
  status: 200,
  error: false,
  message: 'Successfully!',
  data: {},
};

class ProductService {
  getAllProducts(req: Request, res: Response) {
    const query = 'select  *  from products';
    return getItem(req, db.Product, query);
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
