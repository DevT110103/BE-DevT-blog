import { Request, Response } from 'express';

import { CRUDService } from '../services/category';
import { ResponseCategory } from '../../interfaces/category.interface';
class CategoryController {
  async index(req: Request, res: Response) {
    try {
      let data: any = await CRUDService.getAllCategories();
      return res.status(Number(data.status)).json(data);
    } catch (e) {
      const error = e as any;
      return res.status(Number(error.status)).json(error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = (await CRUDService.createCategory(req)) as ResponseCategory;
      return res.status(data.status).json(data);
    } catch (e) {
      const error = e as any;
      return res.status(Number(error.status)).json(error);
    }
  }
}

export default new CategoryController();
