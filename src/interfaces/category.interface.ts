import { Response } from '.';

export interface CategoryDB {
  id: string | number;
  name: string;
  thumbnail_id: string | number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponseCategory extends Response {
  data: CategoryDB[];
}
