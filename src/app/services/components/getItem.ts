import { Request } from 'express';
import { sequelize } from '../../../configs/connectDatabase';

function getItem(req: Request, model: any, query: string) {
  return new Promise(async (resolve, reject) => {
    const id: number = Number(req.query.id);
    const response = {
      status: 200,
      error: false,
      message: 'Successfully!',
      data: {},
    };

    try {
      if (isNaN(id) || !id || id <= 0) {
        const [result, metadata] = await sequelize.query(query);
        response.data = result;
        resolve(response);
      } else {
        const dataDb = await model.findOne({
          where: {
            id: id,
          },
        });

        if (dataDb == null) {
          response.data = {};
          response.error = true;
          response.message = 'dataDb not found';
          response.status = 404;
          reject(response);
        } else {
          response.data = dataDb;
          response.status = 200;
          response.message = 'Get dataDb success';
          response.error = false;
          resolve(response);
        }
      }
    } catch (e) {
      console.log('e ->', e);

      response.status = 400;
      response.error = true;
      response.message = 'Get all categories failed';
      reject(response);
    }
  });
}

export default getItem;
