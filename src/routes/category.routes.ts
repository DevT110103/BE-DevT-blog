import express from 'express';

const router = express.Router();

import categoryController from '../app/controllers/CategoryController';

router.get('/', categoryController.index);
router.get('/get-product', categoryController.getProducts);
router.post('/create', categoryController.create);
router.get('/search', categoryController.search);

export default router;
