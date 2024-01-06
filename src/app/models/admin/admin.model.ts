import { Schema, model } from 'mongoose';
import { ROLE } from '../auth/auth.const';
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
    role: {
      type: String,
      enum: ROLE,
      default: 'ADMIN',
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
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    nid: {
      type: String,
      required: true,
      unique: true,
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
