import { Schema, model } from 'mongoose';
import { ICart } from './cart.interface';

const cartSchema = new Schema<ICart>({
  createdBy: {
    type: String,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

export const Cart = model<ICart>('Cart', cartSchema);
