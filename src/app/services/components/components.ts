import { Request } from 'express';
import { Model, ModelCtor } from 'sequelize';
import resultResponse from '../../../utils/response';

class Components {
  getItem(req: Request, model: ModelCtor<Model<any, any>>) {
    return new Promise(async (resolve, reject) => {
      const page = Number(req.query.p);
      const limit = Number(req.query.l);
      const offset = (page - 1) * limit;
      const id: number = Number(req.query.id);

      try {
        if (isNaN(id) || !id || id <= 0) {
          if (!isNaN(page) && !isNaN(limit) && page && limit) {
            const result = await model.findAll({ offset, limit, order: [['view_amount', 'DESC']] });
            resolve(resultResponse('Get item success', result));
          } else {
            reject(resultResponse('Failed', {}, 500));
          }
        } else {
          const dataDb = await model.findOne({
            where: {
              id: id,
            },
          });

          if (dataDb) {
            if (dataDb.dataValues.view_amount >= 0) {
              const oldViewAmount = Number(dataDb.dataValues.view_amount);
              await model.update(
                {
                  view_amount: oldViewAmount + 1,
                },
                {
                  where: {
                    id: id,
                  },
                }
              );
            }
          }

          if (dataDb == null) {
            reject(resultResponse('Get failed', {}, 400));
          } else {
            resolve(resultResponse('Get one item success', dataDb));
          }
        }
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          console.log('e ->', e);
        }

        reject(resultResponse('Get failed', {}, 500));
      }
    });
  }
}

export default new Components();
