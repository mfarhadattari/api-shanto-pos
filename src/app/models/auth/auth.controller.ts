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
    domain: config.client_base_url,
  });
  res.cookie('shanto-pos-refresh-token', refreshToken, {
    httpOnly: true,
    secure: config.node_env === 'production',
    domain: config.client_base_url,
  });

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Admin logged successfully',
    data: adminInfo,
  });
});

// ---------------->> Export Auth Controllers <<-----------------
export const AuthControllers = { loginAdmin };
