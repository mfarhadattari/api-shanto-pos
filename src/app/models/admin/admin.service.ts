/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { config } from '../../config';
import AppError from '../../error/AppError';
import QueryBuilder from '../../utils/QueryBuilder';
import { Auth } from '../auth/auth.model';
import { ADMIN_SEARCHABLE_FIELDS } from './admin.const';
import { IAdmin, IUpdateAdmin } from './admin.interface';
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
const getAllAdmin = async (query: Record<string, unknown>) => {
  const modelQuery = Admin.find();
  const adminQuery = new QueryBuilder(modelQuery, query)
    .search(ADMIN_SEARCHABLE_FIELDS)
    .filter()
    .sort();

  const result = await adminQuery.modelQuery;
  return result;
};

// ---------------->> Get Single Admin Service <<-----------------
const getSingleAdmin = async (adminId: string) => {
  const result = await Admin.findById(adminId);
  return result;
};

// ---------------->> Block or Unblock Admin Service <<-----------------
const blockOrUnblockAdmin = async (adminId: string, isBlocked: boolean) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // update in admin collection
    const result = await Admin.findByIdAndUpdate(
      adminId,
      { isBlocked },
      {
        session: session,
        new: true,
      },
    );

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Failed to ${isBlocked ? 'blocked' : 'unblocked'} admin`,
      );
    }

    // update in auth collection
    const authUpdate = await Auth.findOneAndUpdate(
      { username: result.username },
      { isBlocked },
      {
        session: session,
        new: true,
      },
    );

    if (!authUpdate) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Failed to ${isBlocked ? 'blocked' : 'unblocked'} admin`,
      );
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

// ---------------->> Update Admin Service <<-----------------
const updateAdmin = async (adminId: string, payload: IUpdateAdmin) => {
  const { address, ...remainingInfo } = payload;
  const updatedData: Record<string, unknown> = {
    ...remainingInfo,
  };
  if (address && Object.keys(address).length) {
    for (const [key, value] of Object.entries(address)) {
      updatedData[`address.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(adminId, updatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

// ---------------->> Export Admin Services <<-----------------
export const AdminServices = {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  blockOrUnblockAdmin,
  updateAdmin,
};
