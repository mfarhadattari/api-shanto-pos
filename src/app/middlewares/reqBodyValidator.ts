import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const reqBodyValidator = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
    });

    return next();
  });
};

export default reqBodyValidator;
