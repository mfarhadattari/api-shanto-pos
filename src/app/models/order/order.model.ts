import { Schema, model } from 'mongoose';
import { IOrder, IOrderProduct } from './order.interface';

const orderProductSchema = new Schema<IOrderProduct>(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const orderSchema = new Schema<IOrder>(
  {
    transactionId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Transaction',
    },
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Customer',
    },
    products: {
      type: [orderProductSchema],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Order = model<IOrder>('Order', orderSchema);
