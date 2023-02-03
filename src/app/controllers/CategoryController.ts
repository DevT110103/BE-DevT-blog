import { Request, Response } from 'express';

import categoryService from '../services/Category.service';

class CategoryController {
  async index(req: Request, res: Response) {
    try {
      let data: any = await categoryService.getAllCategories();
      return res.status(Number(data.status)).json(data);
    } catch (e) {
      const error = e as any;
      return res.status(Number(error.status)).json(error);
    }
  }
}

export default new CategoryController();
