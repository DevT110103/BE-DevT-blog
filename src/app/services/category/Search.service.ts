import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Response as ResponseInterFace } from '../../../interfaces';
const db = require('../../../database/models');
class SearchCategory {
  async search(req: Request, res: Response) {
    return new Promise(async (resolve, reject) => {
      const valueSearch = req.query.q;

      try {
        const response: ResponseInterFace = {
          status: 200,
          error: false,
          message: 'Search success',
          data: {},
        };

        const result = await db.Category.findAll({
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

        if (result === null) {
          resolve(response);
        } else {
          console.log('() ->', result);

          response.data = result;

          resolve(response);
        }
      } catch {
        const response: ResponseInterFace = {
          status: 400,
          error: true,
          message: 'Search failed',
          data: {},
        };
        reject(response);
      }
    });
  }
}

export default new SearchCategory();
