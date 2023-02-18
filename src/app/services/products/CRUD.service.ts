import { Request, Response } from 'express';

import getItem from '../components/components';
import logger from '../../../utils/logger';
import resultResponse from '../../../utils/response';
import Product from '../../../database/models/product';
import Category from '../../../database/models/category';
import components from '../components/components';

class CRUDProduct {
  getAllProducts(req: Request) {
    const query = 'select  *  from products';
    return components.getItem(req, Product);
  }

  getProductsByCategory(req: Request) {
    return new Promise(async (resolve, reject) => {
      const idCategory = Number(req.query.idC);
      try {
        if (!idCategory || isNaN(idCategory)) {
          reject(resultResponse('Id is valid', {}, 500));
        } else {
          const category = await Category.count({
            where: {
              id: idCategory,
            },
          });
          if (category <= 0) {
            reject(resultResponse('Id is valid', {}, 404));
          } else {
            const result = await Product.findAll({
              where: {
                category_id: idCategory,
              },
            });
            if (Array.from(result).length <= 0) {
              resolve(resultResponse('List empty', result));
            } else {
              resolve(resultResponse('Get products by category success', result));
            }
          }
        }
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          logger.error(e);
        }

        reject(resultResponse('Update Failed', {}, 500));
      }
    });
  }

  createProduct(req: Request, res: Response) {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (e) {}
    });
  }
}

export default new CRUDProduct();
