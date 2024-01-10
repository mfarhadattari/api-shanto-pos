import { z } from 'zod';
import { PAYMENT_METHOD } from './transaction.const';

export const createTransactionValidationSchema = z.object({
  body: z.object({
    paymentBy: z.enum(PAYMENT_METHOD as [string, ...string[]], {
      invalid_type_error: 'Payment method in invalid type',
      required_error: 'Payment method is required',
    }),
    paymentId: z.string({
      invalid_type_error: 'Payment id must be string',
      required_error: 'Payment method is required',
    }),
    paymentAt: z
      .string({
        required_error: 'Payment at is required',
      })
      .datetime({
        message: ' Payment at must be ISO Date',
      }),
    amount: z
      .number({
        required_error: 'Payment amount is required',
      })
      .positive('Payment amount must be positive number'),
  }),
});
