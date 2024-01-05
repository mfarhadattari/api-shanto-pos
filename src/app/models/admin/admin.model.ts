import { Schema, model } from 'mongoose';
import { IAddress, IAdmin } from './admin.interface';

const addressSchema = new Schema<IAddress>(
  {
    location: { type: String, required: true },
    townOrVillage: { type: String, required: true },
    city: { type: String, required: true },
  },
  { _id: false },
);

const adminSchema = new Schema<IAdmin>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    nid: {
      type: String,
      required: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Admin = model<IAdmin>('Admin', adminSchema);
