import { z } from 'zod';

export const cartValidationSchema = z.object({
  body: z.object({
    product: z.string({
      invalid_type_error: 'Product id must be a string',
      required_error: 'Product id is required',
    }),
    quantity: z
      .number({ invalid_type_error: 'Quantity must be a number' })
      .default(1),
  }),
});

export const updateCartQuantityValidationSchema = z.object({
  body: z.object({
    quantity: z.number({
      invalid_type_error: 'Quantity must be a number',
      required_error: 'Quantity is required',
    }),
  }),
});
