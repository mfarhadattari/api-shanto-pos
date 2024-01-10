import { z } from 'zod';
import { phoneNumberValidationSchema } from '../admin/admin.validation';
import { PAYMENT_METHOD } from '../transaction/transaction.const';

const orderProductsValidationSchema = z.array(
  z.object({
    product: z.string({
      invalid_type_error: 'Product id must be string',
      required_error: 'Product id must be provide',
    }),
    price: z
      .number({
        required_error: 'Product price must be provide',
      })
      .positive('Product price be positive number'),
    quantity: z
      .number({
        required_error: 'Product quantity must be provide',
      })
      .positive('Product quantity must be positive number'),
  }),
);

export const createOrderValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Customer name must be string',
      required_error: 'Customer name must be provide',
    }),
    email: z.string().email('Customer email is invalid').optional(),
    phone: phoneNumberValidationSchema,
    address: z.string({
      invalid_type_error: 'Customer Address must be string',
      required_error: 'Customer Address must be provide',
    }),
    paymentBy: z.enum(PAYMENT_METHOD as [string, ...string[]], {
      invalid_type_error: 'Payment method in invalid type',
      required_error: 'Payment method must be provide',
    }),
    paymentId: z.string({
      invalid_type_error: 'Payment id must be string',
      required_error: 'Payment method must be provide',
    }),
    paymentAt: z
      .string({
        required_error: 'Payment at must be provide',
      })
      .datetime({
        message: ' Payment at must be ISO Date',
      }),
    amount: z
      .number({
        required_error: 'Payment amount must be provide',
      })
      .positive('Payment amount must be positive number'),
    products: orderProductsValidationSchema,
  }),
});
