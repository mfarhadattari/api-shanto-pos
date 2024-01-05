import { Response } from 'express';

interface IResData<T> {
  status: number;
  message: string;
  data: T;
}

const sendResponse = <T>(res: Response, data: IResData<T>) => {
  res.status(data.status).json({
    success: true,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
