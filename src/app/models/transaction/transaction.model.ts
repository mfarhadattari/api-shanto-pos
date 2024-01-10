import { Schema, model } from 'mongoose';
import { PAYMENT_METHOD } from './transaction.const';
import { ITransaction } from './transaction.interface';

const transactionSchema = new Schema<ITransaction>(
  {
    paymentBy: {
      type: String,
      enum: PAYMENT_METHOD,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    paymentAt: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Transaction = model<ITransaction>(
  'Transaction',
  transactionSchema,
);
