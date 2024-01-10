import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';

// ----------->> Create Order Controller <<--------------
const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrder(req.user, req.body);

  sendResponse(res, {
    status: httpStatus.CREATED,
    message: 'Order created successfully',
    data: result,
  });
});

// ----------->> Export Orders Controllers <<--------------
export const OrderControllers = { createOrder };
