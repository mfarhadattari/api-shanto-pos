import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { config } from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

// ---------------->> Login Admin Controller <<-----------------
const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken, adminInfo } =
    await AuthServices.loginAdmin(req.body);

  res.cookie('shanto-pos-access-token', accessToken, {
    httpOnly: true,
    secure: config.node_env === 'production',
  });
  res.cookie('shanto-pos-refresh-token', refreshToken, {
    httpOnly: true,
    secure: config.node_env === 'production',
  });

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Admin logged successfully',
    data: adminInfo,
  });
});

// ---------------->> Refresh Token Controller <<-----------------
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies['shanto-pos-refresh-token'];
  const { accessToken } = await AuthServices.refreshToken(refreshToken);

  res.cookie('shanto-pos-access-token', accessToken, {
    httpOnly: true,
    secure: config.node_env === 'production',
  });

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Token refresh successfully',
    data: null,
  });
});

// ---------------->> Change Password Controller <<-----------------
const changePassword = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.changePassword(req.user, req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Password changed successfully',
    data: null,
  });
});

// ---------------->> Forget Password Controller <<-----------------
const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.forgetPassword(req.user);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'We send a password reset mail, check your email ',
    data: result,
  });
});

// ---------------->> Reset Password Controller <<-----------------
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await AuthServices.resetPassword(
    req.user,
    req.body,
    token as string,
  );

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Password reset successfully',
    data: result,
  });
});

// ---------------->> My Profile Controller <<-----------------
const myProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.myProfile(req.user);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Profile retrieve successfully',
    data: result,
  });
});

// ---------------->> Export Auth Controllers <<-----------------
export const AuthControllers = {
  loginAdmin,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
  myProfile,
};
