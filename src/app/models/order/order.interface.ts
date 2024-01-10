import { Types } from 'mongoose';
import { TPaymentMethod } from '../transaction/transaction.interface';

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
  createdBy: Date;
}

export interface ICreateOrder {
  name: string;
  email?: string;
  phone: string;
  address: string;
  paymentBy: TPaymentMethod;
  paymentId: string;
  paymentAt: Date;
  amount: number;
  products: IOrderProduct[];
}
