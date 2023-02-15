import express from 'express';

const router = express.Router();

import productController from '../app/controllers/ProductController';

router.get('/', productController.index);
router.post('/create', productController.create);
router.get('/get-products-by-category', productController.getProductByCategory);
export default router;
