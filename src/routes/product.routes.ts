import express from 'express';

const router = express.Router();

import productController from '../app/controllers/ProductController';

router.get('/', productController.index);
router.post('/create', productController.create);

export default router;
