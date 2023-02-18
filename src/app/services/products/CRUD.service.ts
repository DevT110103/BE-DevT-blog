import { Request, Response } from 'express';

import getItem from '../components/components';
import logger from '../../../utils/logger';
import resultResponse from '../../../utils/response';
import Product from '../../../database/models/product';
import Category from '../../../database/models/category';
import components from '../components/components';
import { Model } from 'sequelize';
import { CategoryModel } from '../../../interfaces/category.interface';
import { ProductModel } from '../../../interfaces/product.interface';
import { unlink } from 'fs';

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

  createProduct(req: Request) {
    return new Promise(async (resolve, reject) => {
      const name = req.body.pName as string;
      const seo_name = req.body.pSeoName as string;
      const link = req.body.pLink as string;
      const file = req.file as Express.Multer.File;
      const desc = req.body.pDesc as string;
      const category_id = req.body.pCategoryId as number;

      let thumbnail = '';

      try {
        if (!category_id || isNaN(category_id) || category_id < 0) return reject(resultResponse('Category id is valid', {}, 500));

        const category = (await Category.findByPk(category_id)) as Model<CategoryModel>;

        if (!category) return reject(resultResponse('Category is not exists', {}, 500));

        if (!name || !seo_name) return reject(resultResponse('name or seo name is valid', {}, 500));

        if (file) thumbnail = components.setUrlThumbnail(file);

        await Product.create({
          name,
          seo_name,
          link,
          thumbnail,
          desc,
          category_id,
        });

        return resolve(resultResponse('created products success', {}));
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          logger.error(e);
        }
        return reject(resultResponse('Create failed', {}, 500));
      }
    });
  }

  updateProduct(req: Request) {
    return new Promise(async (resolve, reject) => {
      const id = Number(req.query.id);
      const name = req.body.pName as string;
      const seo_name = req.body.pSeoName as string;
      const link = req.body.pLink as string;
      const file = req.file as Express.Multer.File;
      const desc = req.body.pDesc as string;
      const category_id = req.body.pCategoryId as number;

      let thumbnail = '';
      try {
        if (!id || isNaN(id) || id <= 0) return reject(resultResponse('Id is valid', {}, 404));
        const product = (await Product.findByPk(id)) as Model<ProductModel>;
        if (!product) reject(resultResponse('Product empty', {}, 404));

        if (file) {
          thumbnail = components.setUrlThumbnail(file);
        }
        const updateValue: Partial<ProductModel> = {};

        if (name) updateValue.name = name;

        if (seo_name) updateValue.seo_name = seo_name;

        if (link) updateValue.link = seo_name;

        if (thumbnail) updateValue.thumbnail = thumbnail;

        if (desc) updateValue.desc = desc;

        if (category_id) updateValue.category_id = category_id;

        await product.update(updateValue);
        return resolve(resultResponse('Product updated', {}));
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          logger.error(e);
        }

        reject(resultResponse('Update Failed', {}, 500));
      }
    });
  }

  deleteProduct(req: Request) {
    return new Promise(async (resolve, reject) => {
      const id = Number(req.query.id);
      try {
        if (!id || isNaN(id) || id <= 0) return reject(resultResponse('id is valid', {}, 400));

        const product = await Product.findByPk(id);

        if (!product) return reject(resultResponse('Product empty', {}, 404));

        const thumbnailName = String(product.dataValues.thumbnail).split('/').pop();
        unlink(`./src/public/uploads/${thumbnailName}`, (err) => {});

        product.destroy();

        return resolve(resultResponse('Deleted', {}));
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          logger.error(e);
        }

        reject(resultResponse('Update Failed', {}, 500));
      }
    });
  }
}

export default new CRUDProduct();
