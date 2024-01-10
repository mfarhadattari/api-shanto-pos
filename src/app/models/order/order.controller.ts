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

// ----------->> Get All Orders Controller <<--------------
const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrders(req.user, req.query);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Orders retrieve successfully',
    data: result,
  });
});

// ----------->> Get Single Order Controller <<--------------
const getSingleOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.getSingleOrder(
    req.user,
    req.params.orderId,
  );

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Order retrieve successfully',
    data: result,
  });
});

// ----------->> Export Orders Controllers <<--------------
export const OrderControllers = { createOrder, getAllOrders, getSingleOrder };
