import { Response } from '.';

export interface CategoryModel {
  id: number;
  name: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponseCategory extends Response {
  data: CategoryModel[];
}
