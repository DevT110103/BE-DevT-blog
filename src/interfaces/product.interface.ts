import { Product, Response } from '.';

interface ResponseProduct extends Response {
  data: Product;
}

export { ResponseProduct };
