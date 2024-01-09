import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/AppError';
import { ICart } from './cart.interface';
import { Cart } from './cart.model';

// ----------------->> Create Cart Service <<-------------------
const createCart = async (adminInfo: JwtPayload, payload: ICart) => {
  // check already exist
  const isAlreadyExist = await Cart.findOne({
    product: payload.product,
    createdBy: adminInfo.username,
  });

  // if exist update quantity
  if (isAlreadyExist) {
    const result = await Cart.findByIdAndUpdate(
      isAlreadyExist._id,
      {
        quantity: isAlreadyExist.quantity + 1,
      },
      {
        new: true,
      },
    ).populate('product');
    return result;
  }

  // if not exist create new cart
  payload.createdBy = adminInfo.username;
  payload.quantity = 1;
  const result = (await Cart.create(payload)).populate('product');
  return result;
};

// ----------------->> Get My Carts Service <<-------------------
const myCarts = async (adminInfo: JwtPayload) => {
  const result = await Cart.find({ createdBy: adminInfo.username }).populate(
    'product',
  );
  return result;
};

// ----------------->> Delete Cart Service <<-------------------
const deleteCart = async (adminInfo: JwtPayload, cartId: string) => {
  // check cart exist
  const isCartExist = await Cart.findById(cartId);
  if (!isCartExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart is not found');
  }

  // check created by and admin user name
  const isAdminHasPermission = adminInfo.username === isCartExist.createdBy;
  if (!isAdminHasPermission) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Unauthorized, you do not have permission',
    );
  }

  await Cart.findByIdAndDelete(cartId);
  return null;
};

// ----------------->> Export Cart Services <<-------------------
export const CartServices = {
  createCart,
  myCarts,
  deleteCart,
};
