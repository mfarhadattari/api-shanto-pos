import { Schema, model } from 'mongoose';
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
