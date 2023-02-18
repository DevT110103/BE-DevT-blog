import express from 'express';

const router = express.Router();

import productController from '../app/controllers/ProductController';
import upload from '../app/middlewares/Uploads.middlewares';

router.get('/', productController.index);
router.post('/create', upload.single('thumbnail'), productController.create);
router.post('/update', upload.single('thumbnail'), productController.update);
router.delete('/delete', productController.delete);
router.get('/get-products-by-category', productController.getProductByCategory);
export default router;
