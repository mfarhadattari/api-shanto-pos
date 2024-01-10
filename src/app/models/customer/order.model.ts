import { Schema, model } from 'mongoose';
import { ICustomer } from './customer.interface';

const customerSchema = new Schema<ICustomer>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Customer = model<ICustomer>('Customer', customerSchema);
