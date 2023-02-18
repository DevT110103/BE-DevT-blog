import { Request } from 'express';
import { Model, ModelCtor } from 'sequelize';
import resultResponse from '../../../utils/response';

class Components {
  getItem(req: Request, model: ModelCtor<Model<any, any>>) {
    return new Promise(async (resolve, reject) => {
      const page = Number(req.query.p) || 1;
      const limit = Number(req.query.l) || 10;
      const offset = (page - 1) * limit;
      const id: number = Number(req.query.id);

      try {
        if (isNaN(id) || !id || id <= 0) {
          const result = await model.findAll({ offset, limit });
          resolve(resultResponse('Get item success', result));
        } else {
          const dataDb = await model.findOne({
            where: {
              id: id,
            },
          });

          if (dataDb) {
            if (dataDb.dataValues.view_count >= 0) {
              const oldViewAmount = Number(dataDb.dataValues.view_count);
              await model.update(
                {
                  view_count: oldViewAmount + 1,
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

  setUrlThumbnail(file: Express.Multer.File): string {
    if (process.env.NODE_ENV === 'development') {
      return `http://127.0.0.1:8080/uploads/${file.filename}`;
    } else {
      return '';
    }
  }
}

export default new Components();
