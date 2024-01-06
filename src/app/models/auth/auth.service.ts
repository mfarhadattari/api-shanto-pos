import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config';
import AppError from '../../error/AppError';
import { Admin } from '../admin/admin.model';
import { hashedPassword } from '../admin/admin.utils';
import { IAuth, IChangePassword } from './auth.interface';
import { Auth } from './auth.model';
import {
  matchingPasswords,
  sendPasswordResetMail,
  tokenGenerator,
} from './auth.utils';

// ---------------->> Login Services <<-----------------
const loginAdmin = async (payload: IAuth) => {
  // check this admin exist
  const admin = await Auth.findOne({ username: payload.username }).select(
    '+password',
  );
  if (!admin) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Admin not found on username ${payload.username}`,
    );
  }

  // matching password
  const isPasswordMatch = await matchingPasswords(
    admin.password,
    payload.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'You provide wrong password');
  }
  // generating jwt
  const tokenPayload = {
    _id: admin._id,
    username: admin.username,
    role: admin.role,
  };
  const accessToken = tokenGenerator(
    tokenPayload,
    config.access_token_secret as string,
    config.access_token_expires as string,
  );
  const refreshToken = tokenGenerator(
    tokenPayload,
    config.refresh_token_secret as string,
    config.refresh_token_expires as string,
  );
  if (!accessToken || !refreshToken) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to generate token');
  }

  const adminInfo = await Admin.findOne({ username: payload.username });

  return { accessToken, refreshToken, adminInfo };
};

// ---------------->> Change Password Services <<-----------------
const changePassword = async (
  userInfo: JwtPayload,
  payload: IChangePassword,
) => {
  // match old password
  const admin = await Auth.findById(userInfo._id).select('+password');
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  const isPasswordMatch = matchingPasswords(
    admin.password,
    payload.oldPassword,
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'You provide wrong password');
  }

  // set new password
  const newPassword = await hashedPassword(payload.newPassword);
  const updatedInfo = {
    password: newPassword,
    needPasswordChange: false,
    passwordChangedAt: new Date(),
  };

  await Auth.findByIdAndUpdate(userInfo._id, updatedInfo, {
    new: true,
    upsert: true,
  });
};

// -------------->> Forget Password Services <<-----------------
const forgetPassword = async (userInfo: JwtPayload) => {
  const admin = await Admin.findOne({ username: userInfo.username });
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  // generate password reset token and link
  // generating jwt
  const tokenPayload = {
    _id: userInfo._id,
    username: userInfo.username,
    role: userInfo.role,
  };
  const resetToken = tokenGenerator(
    tokenPayload,
    config.access_token_secret as string,
    '5m',
  );
  const passwordResetLink = `${config.client_base_url}/reset-password?token=${resetToken}`;
  await sendPasswordResetMail(admin.name, admin.email, passwordResetLink);
};

// ---------------->> Export Auth Services <<-----------------
export const AuthServices = { loginAdmin, changePassword, forgetPassword };
