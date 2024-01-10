import express from 'express';
import authValidator from '../../middlewares/authValidator';
import reqBodyValidator from '../../middlewares/reqBodyValidator';
import { OrderControllers } from './order.controller';
import { createOrderValidationSchema } from './order.validation';

// initialize router
const router = express.Router();

// ----------->> Create Order Route <<--------------
router.post(
  '/',
  authValidator('ADMIN', 'SUPER_ADMIN'),
  reqBodyValidator(createOrderValidationSchema),
  OrderControllers.createOrder,
);

// ----------->> Export Order Routes <<--------------
export const OrderRoutes = router;
