import express from 'express';

const router = express.Router();

import productController from '../app/controllers/ProductController';
import upload from '../app/middlewares/Uploads.middlewares';

router.get('/', productController.index);
router.post('/create', upload.single('thumbnail'), productController.create);
router.get('/get-products-by-category', productController.getProductByCategory);
export default router;
