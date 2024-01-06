import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config';
import AppError from '../../error/AppError';
import { Admin } from '../admin/admin.model';
import { hashedPassword } from '../admin/admin.utils';
import { IAuth, IChangePassword, IResetPassword } from './auth.interface';
import { Auth } from './auth.model';
import {
  matchingPasswords,
  sendPasswordResetMail,
  tokenDecoder,
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

// ---------------->> Refresh Token Services <<-----------------
const refreshToken = async (token: string) => {
  // decoding refresh token
  const decoded = tokenDecoder(
    token,
    config.refresh_token_secret as string,
  ) as JwtPayload;
  if (!decoded) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Unauthorized, failed to decode token',
    );
  }

  // generating access token
  const tokenPayload = {
    _id: decoded._id,
    username: decoded.username,
    role: decoded.role,
  };
  const accessToken = tokenGenerator(
    tokenPayload,
    config.access_token_secret as string,
    config.access_token_expires as string,
  );

  return { accessToken };
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
  const tokenPayload = {
    _id: userInfo._id,
    username: userInfo.username,
    role: userInfo.role,
  };
  const resetToken = tokenGenerator(
    tokenPayload,
    config.reset_token_secret as string,
    config.reset_token_expires as string,
  );
  const passwordResetLink = `${config.client_base_url}/reset-password?token=${resetToken}`;
  await sendPasswordResetMail(admin.name, admin.email, passwordResetLink);
  return null;
};

// -------------->> Reset Password Services <<-----------------
const resetPassword = async (
  userInfo: JwtPayload,
  payload: IResetPassword,
  token: string,
) => {
  const decoded = tokenDecoder(
    token,
    config.reset_token_secret as string,
  ) as JwtPayload;
  if (!decoded) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Unauthorized, failed to decode token',
    );
  }
  // check requested and token user same
  const isUserSame =
    decoded.username === userInfo.username && decoded._id === userInfo._id;
  if (!isUserSame) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Unauthorized, you cannot access',
    );
  }
  // hashing new password
  const newPassword = await hashedPassword(payload.newPassword);
  if (!newPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to hashing password');
  }

  // updating password
  const updatedInfo = {
    password: newPassword,
    passwordChangedAt: new Date(),
    needPasswordChange: false,
  };

  await Auth.findByIdAndUpdate(userInfo._id, updatedInfo, {
    new: true,
    upsert: true,
  });
  return null;
};

// ---------------->> Export Auth Services <<-----------------
export const AuthServices = {
  loginAdmin,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
