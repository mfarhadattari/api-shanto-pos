import { Request, Response } from 'express';
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

// ---------------->> Export Admin Controllers <<-----------------
export const AdminControllers = { createAdmin };
