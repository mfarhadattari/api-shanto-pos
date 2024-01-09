import express from 'express';
import authValidator from '../../middlewares/authValidator';
import reqBodyValidator from '../../middlewares/reqBodyValidator';
import { ProductControllers } from './product.controller';
import { createProductValidationSchema } from './product.validation';

// initialize router
const router = express.Router();

// ---------------->> Create Product Route <<-----------------
router.post(
  '/',
  authValidator('SUPER_ADMIN'),
  reqBodyValidator(createProductValidationSchema),
  ProductControllers.createProduct,
);

// ---------------->> Get All Product Route <<-----------------
router.get(
  '/',
  authValidator('SUPER_ADMIN', 'ADMIN'),
  ProductControllers.getAllProduct,
);

// ---------------->> Get Single Product Route <<-----------------
router.get(
  '/:productId',
  authValidator('SUPER_ADMIN', 'ADMIN'),
  ProductControllers.getSingleProduct,
);

// ---------------->> Update Product Route <<-----------------
router.patch(
  '/:productId',
  authValidator('SUPER_ADMIN'),
  ProductControllers.updateProduct,
);

// ---------------->> Delete Product Route <<-----------------
router.delete(
  '/:productId',
  authValidator('SUPER_ADMIN'),
  ProductControllers.deleteProduct,
);

// export Product routes
export const ProductRoutes = router;
