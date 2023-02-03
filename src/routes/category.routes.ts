import express from 'express';

const router = express.Router();

import categoryController from '../app/controllers/CategoryController';

router.get('/', categoryController.index);

export default router;
