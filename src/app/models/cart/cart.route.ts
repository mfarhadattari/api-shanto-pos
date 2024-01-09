import express from 'express';
import authValidator from '../../middlewares/authValidator';
import reqBodyValidator from '../../middlewares/reqBodyValidator';
import { CartControllers } from './cart.controller';
import {
  cartValidationSchema,
  updateCartQuantityValidationSchema,
} from './cart.validation';

// initialize router
const router = express.Router();

// ---------------->> Create Cart Route <<-----------------
router.post(
  '/',
  authValidator('ADMIN', 'SUPER_ADMIN'),
  reqBodyValidator(cartValidationSchema),
  CartControllers.createCart,
);

// ---------------->> My Carts Route <<-----------------
router.get('/', authValidator('ADMIN', 'SUPER_ADMIN'), CartControllers.myCarts);

// ---------------->> Clear Carts Route <<-----------------
router.delete(
  '/clear-carts',
  authValidator('ADMIN', 'SUPER_ADMIN'),
  CartControllers.clearCarts,
);

// ---------------->> Delete Cart Route <<-----------------
router.delete(
  '/:cartId',
  authValidator('ADMIN', 'SUPER_ADMIN'),
  CartControllers.deleteCart,
);

// ---------------->> Update Cart Quantity Route <<-----------------
router.patch(
  '/:cartId',
  authValidator('ADMIN', 'SUPER_ADMIN'),
  reqBodyValidator(updateCartQuantityValidationSchema),
  CartControllers.updateCartQuantity,
);

// export cart routes
export const CartRoutes = router;
