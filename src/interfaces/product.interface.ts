import { Product, Response } from '.';

export interface ProductModel {
  id: number;
  name: string;
  seo_name: string;
  link: string;
  thumbnail: string;
  view_amount: number;
  desc: string;
  category_id: number;
  createdAt: Date;
  updatedAte: Date;
}
interface ResponseProduct extends Response {
  data: Product[];
}

export { ResponseProduct };
