import express from 'express';

const router = express.Router();

import commentController from '../app/controllers/CommentController';

router.get('/', commentController.index);

export default router;
