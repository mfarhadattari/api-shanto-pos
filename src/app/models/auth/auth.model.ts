import { Schema, model } from 'mongoose';
import { ROLE } from './auth.const';
import { IAuth } from './auth.interface';

const authSchema = new Schema<IAuth>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: true,
    },
    role: {
      type: String,
      enum: ROLE,
      default: 'ADMIN',
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Auth = model<IAuth>('Auth', authSchema);
