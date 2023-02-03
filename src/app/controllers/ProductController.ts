import { Request, Response } from 'express';
import { Response as ResponseInterface } from '../../interfaces';

import CRUDProductService from '../services/Product.service';
import { ResponseProduct } from '../../interfaces/product.interface';
class ProductController {
  async index(req: Request, res: Response) {
    try {
      let data = (await CRUDProductService.getAllProducts(req, res)) as ResponseProduct;
      return res.status(Number(data.status)).json(data);
    } catch (e) {
      const error = e as ResponseInterface;
      return res.status(Number(error.status)).json(error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = (await CRUDProductService.createProduct(req, res)) as ResponseProduct;
      return res.status(data.status).json(data);
    } catch (e) {
      const error = e as ResponseInterface;
      return res.status(error.status).json(error);
    }
  }
}
export default new ProductController();
