import { Express } from 'express';

import productRouter from './product.routes';
import categoriesRouter from './category.routes';
import commentRouter from './comment.routes';

function route(app: Express) {
  const endPointURL = '/api/v1';

  app.use(endPointURL + '/products', productRouter);
  app.use(endPointURL + '/categories', categoriesRouter);
  app.use(endPointURL + '/comments', commentRouter);
}

export default route;
