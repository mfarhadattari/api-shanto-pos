import express from 'express';
import authValidator from '../../middlewares/authValidator';
import reqBodyValidator from '../../middlewares/reqBodyValidator';
import { CartControllers } from './cart.controller';
import { cartValidationSchema } from './cart.validation';

// initialize router
const router = express.Router();

// ---------------->> Create Cart Route <<-----------------
router.post(
  '/',
  authValidator('ADMIN', 'SUPER_ADMIN'),
  reqBodyValidator(cartValidationSchema),
  CartControllers.createCart,
);

// export cart routes
export const CartRoutes = router;
