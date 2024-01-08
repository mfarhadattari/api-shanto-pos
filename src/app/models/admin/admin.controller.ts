import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

// ---------------->> Create Admin Controller <<-----------------
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.createAdmin(req.body);
  sendResponse(res, {
    status: 201,
    message: 'Admin created successfully',
    data: result,
  });
});

// ---------------->> Get All Admin Controller <<-----------------
const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.getAllAdmin(req.query);
  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Admin retrieve successfully',
    data: result,
  });
});

// ---------------->> Get Single Admin Controller <<-----------------
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.getSingleAdmin(req.params.adminId);
  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Admin got successfully',
    data: result,
  });
});

// ---------------->> Block or Unblock Admin Controller <<-----------------
const blockOrUnblockAdmin = catchAsync(async (req: Request, res: Response) => {
  const isBlocked = req.query.isBlocked === 'true';
  const result = await AdminServices.blockOrUnblockAdmin(
    req.params.adminId,
    isBlocked,
  );
  sendResponse(res, {
    status: httpStatus.OK,
    message: `Admin ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
    data: result,
  });
});

// ---------------->> Update Admin Controller <<-----------------
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.updateAdmin(req.params.adminId, req.body);
  sendResponse(res, {
    status: httpStatus.OK,
    message: `Admin updated successfully`,
    data: result,
  });
});

// ---------------->> Export Admin Controllers <<-----------------
export const AdminControllers = {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  blockOrUnblockAdmin,
  updateAdmin,
};
