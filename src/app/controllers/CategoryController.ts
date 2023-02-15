import { Request, Response } from 'express';

import { Response as ResponseInterface } from '../../interfaces';
import { CRUDService, SearchService } from '../services/category';
import { ResponseCategory } from '../../interfaces/category.interface';
import { ResponseProduct } from '../../interfaces/product.interface';
class CategoryController {
  async index(req: Request, res: Response) {
    try {
      let data = (await CRUDService.getAllCategories(req)) as ResponseCategory;
      return res.status(Number(data.status)).json(data);
    } catch (e) {
      const error = e as ResponseInterface;
      return res.status(Number(error.status)).json(error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = (await CRUDService.createCategory(req)) as ResponseCategory;
      return res.status(data.status).json(data);
    } catch (e) {
      const error = e as ResponseInterface;
      return res.status(Number(error.status)).json(error);
    }
  }

  async search(req: Request, res: Response) {
    try {
      const data = (await SearchService.search(req)) as ResponseCategory;
      return res.status(data.status).json(data);
    } catch (e) {
      const error = e as ResponseInterface;
      return res.status(Number(error.status)).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const data = (await CRUDService.deleteCategories(req)) as ResponseCategory;
      return res.status(data.status).json(data);
    } catch (e) {
      const error = e as ResponseInterface;
      return res.status(error.status).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data = (await CRUDService.updateCategory(req)) as ResponseCategory;
      return res.status(data.status).json(data);
    } catch (e) {
      const error = e as ResponseInterface;
      return res.status(error.status).json(error);
    }
  }
}

export default new CategoryController();
