import express from 'express';

const router = express.Router();

import categoryController from '../app/controllers/CategoryController';

router.get('/', categoryController.index);
router.post('/create', categoryController.create);

export default router;
