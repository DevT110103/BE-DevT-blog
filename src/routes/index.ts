import { Express } from 'express';

import productRouter from './product.routes';
import categoriesRouter from './category.routes';

function route(app: Express) {
  app.use('/products', productRouter);
  app.use('/categories', categoriesRouter);
}

export default route;
