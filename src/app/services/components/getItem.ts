import { Request } from 'express';
import { sequelize } from '../../../configs/connectDatabase';

function getItem(req: Request, model: any, query: string) {
  return new Promise(async (resolve, reject) => {
    const idCategory: number = Number(req.query.id);
    const response = {
      status: 200,
      error: false,
      message: 'Successfully!',
      data: {},
    };

    try {
      if (isNaN(idCategory) || !idCategory || idCategory <= 0) {
        const [result, metadata] = await sequelize.query(query);
        response.data = result;
        resolve(response);
      } else {
        const category = await model.findOne({
          where: {
            id: idCategory,
          },
        });
        if (category == null) {
          response.data = {};
          response.error = true;
          response.message = 'Category not found';
          response.status = 404;
          reject(response);
        } else {
          response.data = category;
          response.status = 200;
          response.message = 'Get category success';
          response.error = false;
          resolve(response);
        }
      }
    } catch (e) {
      response.status = 400;
      response.error = true;
      response.message = 'Get all categories failed';
      reject(response);
    }
  });
}

export default getItem;
