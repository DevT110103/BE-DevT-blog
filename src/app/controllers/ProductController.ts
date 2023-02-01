import { Request, Response } from 'express';
class ProductController {
  index(req: Request, res: Response) {
    return res.status(200).json('Null');
  }
}
export default new ProductController();
