import mongoose from 'mongoose';
import { config } from '../../config';
import { Auth } from '../auth/auth.model';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';
import { generateUsername } from './admin.utils';

// ---------------->> Create Admin Service <<-----------------
const createAdmin = async (payload: IAdmin) => {
  // generate username and check this exist
  let username = generateUsername(payload.email);
  const usernameAlreadyExist = await Admin.findOne({ username: username });
  if (usernameAlreadyExist) {
    username = generateUsername(payload.email);
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // create auth info and store into db
    const authInfo = {
      username: username,
      password: config.default_password,
    };

    const authResult = await Auth.create([authInfo], { session });
    if (!authResult) {
      throw new Error('Failed to create admin');
    }

    // create admin and store into db
    payload.username = username;
    const result = await Admin.create([payload], { session });
    if (!result) {
      throw new Error('Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

// ---------------->> Export Admin Services <<-----------------
export const AdminServices = { createAdmin };
