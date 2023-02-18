import { Request } from 'express';
import { Op } from 'sequelize';

import resultResponse from '../../../utils/response';
import Category from '../../../database/models/category';
class SearchCategory {
  async search(req: Request) {
    return new Promise(async (resolve, reject) => {
      const valueSearch = req.query.q;

      try {
        const result = await Category.findAll({
          where: {
            name: {
              [Op.or]: [
                {
                  [Op.like]: valueSearch,
                },
                {
                  [Op.startsWith]: valueSearch,
                },
              ],
            },
          },
        });

        resolve(resultResponse('Search success', result));
      } catch {
        reject(resultResponse('Search failed', {}, 500));
      }
    });
  }
}

export default new SearchCategory();
