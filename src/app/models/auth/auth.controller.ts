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

// ---------------->> Export Auth Controllers <<-----------------
export const AuthControllers = { loginAdmin, changePassword, forgetPassword };
