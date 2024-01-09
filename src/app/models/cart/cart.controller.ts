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

// ----------------->> Delete Cart Controller <<-----------------------
const deleteCart = catchAsync(async (req, res) => {
  const result = await CartServices.deleteCart(req.user, req.params.cartId);
  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Cart deleted successfully',
    data: result,
  });
});

// ----------------->> Clear Cart Controller <<-----------------------
const clearCarts = catchAsync(async (req, res) => {
  const result = await CartServices.clearCarts(req.user);
  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Cart clear successfully',
    data: result,
  });
});

// ----------------->> Export Cart Controllers <<-------------------
export const CartControllers = {
  createCart,
  myCarts,
  deleteCart,
  clearCarts,
};
