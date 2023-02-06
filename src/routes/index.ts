import { Express } from 'express';

import productRouter from './product.routes';
import categoriesRouter from './category.routes';

function route(app: Express) {
  const endPointURL = '/api/v1';

  app.use(endPointURL + '/products', productRouter);
  app.use(endPointURL + '/categories', categoriesRouter);
}

export default route;
