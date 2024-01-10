import { Types } from 'mongoose';

export interface IOrderProduct {
  product: Types.ObjectId;
  price: number;
  quantity: number;
}

export interface IOrder {
  transactionId: Types.ObjectId;
  customerId: Types.ObjectId;
  products: IOrderProduct[];
  totalAmount: number;
  createdBy: string;
}
