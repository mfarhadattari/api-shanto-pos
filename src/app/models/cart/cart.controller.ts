import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CartServices } from './cart.service';

// ----------------->> Create Cart Controller <<-------------------
const createCart = catchAsync(async (req, res) => {
  const adminInfo = req.user;
  const result = await CartServices.createCart(adminInfo, req.body);
  sendResponse(res, {
    status: httpStatus.CREATED,
    message: 'Product successfully added to Cart',
    data: result,
  });
});

// ----------------->> My Carts Controller <<-------------------
const myCarts = catchAsync(async (req, res) => {
  const adminInfo = req.user;
  const result = await CartServices.myCarts(adminInfo);
  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Cart retrieved successfully',
    data: result,
  });
});

// ----------------->> Export Cart Controllers <<-------------------
export const CartControllers = {
  createCart,
  myCarts,
};
