import { Request, Response } from 'express';
import { Response as ResponseInterface } from '../../interfaces';

import CRUDService from '../services/products/CRUD.service';
import { ResponseProduct } from '../../interfaces/product.interface';
class ProductController {
  async index(req: Request, res: Response) {
    try {
      let data = (await CRUDService.getAllProducts(req)) as ResponseProduct;
      return res.status(Number(data.status)).json(data);
    } catch (e) {
      const error = e as ResponseInterface;
      return res.status(Number(error.status)).json(error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = (await CRUDService.createProduct(req)) as ResponseProduct;
      return res.status(data.status).json(data);
    } catch (e) {
      const error = e as ResponseInterface;
      return res.status(error.status).json(error);
    }
  }

  async getProductByCategory(req: Request, res: Response) {
    try {
      const data = (await CRUDService.getProductsByCategory(req)) as ResponseProduct;
      return res.status(data.status).json(data);
    } catch (e) {
      const error = e as ResponseInterface;
      return res.status(error.status).json(error);
    }
  }
}
export default new ProductController();
