import { Request } from 'express';
import { Op } from 'sequelize';

import logger from '../../../utils/logger';
import resultResponse from '../../../utils/response';
import Comment from '../../../database/models/comment';
import User from '../../../database/models/user';

function getComment(req: Request) {
  return new Promise(async (resolve, reject) => {
    const postId = Number(req.query.postId);
    const userId = Number(req.query.userId);
    try {
      if (postId && userId) {
        const result = await Comment.findAll({
          include: [
            {
              model: User,
              attributes: ['last_name', 'first_name'],
            },
          ],
          where: { user_id: userId, post_id: postId },
        });

        resolve(resultResponse('get comments success', result));
      } else {
        resolve(resultResponse('empty', {}));
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        logger.error(e);
      }

      reject(resultResponse('Update Failed', {}, 500));
    }
  });
}

export default getComment;
