/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { config } from '../../config';
import AppError from '../../error/AppError';
import { Auth } from '../auth/auth.model';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';
import { generateUsername, hashedPassword } from './admin.utils';

// ---------------->> Create Admin Service <<-----------------
const createAdmin = async (payload: IAdmin) => {
  // generate username and check this exist
  let username = generateUsername(payload.email);
  const usernameAlreadyExist = await Admin.findOne({ username: username });
  if (usernameAlreadyExist) {
    username = generateUsername(payload.email);
  }

  // hashing password
  const hashedPass = await hashedPassword(config.default_password as string);
  if (!hashedPass) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to hashed password');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // create auth info and store into db
    const authInfo = {
      username: username,
      password: hashedPass,
      role: payload.role,
    };

    const authResult = await Auth.create([authInfo], { session });
    if (!authResult) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    // create admin and store into db
    payload.username = username;
    const result = await Admin.create([payload], { session });
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

// ---------------->> Get Admin Service <<-----------------
const getAllAdmin = async () => {
  const result = await Admin.find();
  return result;
};

// ---------------->> Export Admin Services <<-----------------
export const AdminServices = { createAdmin, getAllAdmin };
