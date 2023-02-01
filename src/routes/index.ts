import { Express } from 'express';

import productRouter from './product.routes';

function route(app: Express) {
  app.use('/products', productRouter);
}

export default route;
