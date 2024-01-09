import { JwtPayload } from 'jsonwebtoken';
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

// ----------------->> Export Cart Services <<-------------------
export const CartServices = {
  createCart,
  myCarts,
};
