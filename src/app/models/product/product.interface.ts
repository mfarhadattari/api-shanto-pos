import { Types } from 'mongoose';

export interface IProduct {
  name: string;
  image: string;
  categoryId: Types.ObjectId;
  price: number;
  stock: number;
  description: string;
  isDeleted: boolean;
}
