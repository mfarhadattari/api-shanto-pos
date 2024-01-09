import { Types } from 'mongoose';

export interface ICart {
  createdBy: string;
  product: Types.ObjectId;
  quantity: number;
}
