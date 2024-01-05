/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { config } from '../config';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  const errorSource = [
    {
      path: '',
      message,
    },
  ];

  return res.status(status).json({
    success: false,
    message: message,
    error: error,
    errorSource: errorSource,
    stack: config.node_env === 'development' ? error.stack : null,
  });
};

export default globalErrorHandler;
