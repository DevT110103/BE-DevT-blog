import express from 'express';

const router = express.Router();

import productController from '../app/controllers/ProductController';

router.get('/', productController.index);

export default router;
