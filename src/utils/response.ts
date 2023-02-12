import { Response } from '../interfaces';

function resultResponse(message: string, data: any, status = 200) {
  let response: Response = {
    status,
    error: false,
    message,
    data,
  };

  if (status !== 200) {
    response.error = true;
  }

  return response;
}
export default resultResponse;
