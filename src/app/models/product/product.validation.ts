import { z } from 'zod';

export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Product name must be string',
      required_error: 'Product name is required',
    }),
    image: z
      .string({ required_error: 'Product image URL is required' })
      .url({ message: 'Product image must be a valid URL' }),
    categoryId: z.string({
      invalid_type_error: 'Product category id must be string',
      required_error: 'Product category id is required',
    }),
    price: z
      .number({
        required_error: 'Product price is required',
      })
      .positive({ message: 'Product price must be a positive number' }),
    stock: z
      .number({
        required_error: 'Product stock id is required',
      })
      .nonnegative({ message: 'Product stock cannot be negative' }),
    description: z.string().optional(),
  }),
});

export const updateProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Product name must be string',
        required_error: 'Product name is required',
      })
      .optional(),
    image: z
      .string({ required_error: 'Product image URL is required' })
      .url({ message: 'Product image must be a valid URL' })
      .optional(),
    categoryId: z
      .string({
        invalid_type_error: 'Product category id must be string',
        required_error: 'Product category id is required',
      })
      .optional(),
    price: z
      .number({
        required_error: 'Product price is required',
      })
      .positive({ message: 'Product price must be a positive number' })
      .optional(),
    stock: z
      .number({
        required_error: 'Product stock id is required',
      })
      .nonnegative({ message: 'Product stock cannot be negative' })
      .optional(),
    description: z.string().optional(),
  }),
});
