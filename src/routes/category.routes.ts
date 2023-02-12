import express from 'express';

const router = express.Router();

import categoryController from '../app/controllers/CategoryController';
import upload from '../app/middlewares/Uploads.middlewares';

router.get('/', categoryController.index);
router.post('/create', upload.single('thumbnail'), categoryController.create);
router.get('/search', categoryController.search);
router.delete('/delete', categoryController.delete);

export default router;
