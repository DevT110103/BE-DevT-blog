import { Request, Response } from 'express';

import { Response as ResponseInterface } from '../../interfaces';
import { ResponseCategory } from '../../interfaces/category.interface';
import getComment from '../services/comment/GetComment.service';

class CategoryController {
  async index(req: Request, res: Response) {
    try {
      let data = (await getComment(req)) as any;
      return res.status(Number(data.status)).json(data);
    } catch (e) {
      const error = e as ResponseInterface;
      return res.status(Number(error.status)).json(error);
    }
  }
}

export default new CategoryController();
