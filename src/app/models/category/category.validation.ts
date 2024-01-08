import { z } from 'zod';

export const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Category name must be string',
      required_error: 'Category name is required',
    }),
  }),
});
