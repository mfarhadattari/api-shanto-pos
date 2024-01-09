import express from 'express';
import authValidator from '../../middlewares/authValidator';
import reqBodyValidator from '../../middlewares/reqBodyValidator';
import { CategoryControllers } from './category.controller';
import { createCategoryValidationSchema } from './category.validation';

// initialize router
const router = express.Router();

// ---------------->> Create Category Route <<-----------------
router.post(
  '/',
  authValidator('SUPER_ADMIN'),
  reqBodyValidator(createCategoryValidationSchema),
  CategoryControllers.createCategory,
);

// ---------------->> Get All Category Route <<-----------------
router.get(
  '/',
  authValidator('SUPER_ADMIN', 'ADMIN'),
  CategoryControllers.getAllCategory,
);

// ---------------->> Get Single Category Route <<-----------------
router.get(
  '/:categoryId',
  authValidator('SUPER_ADMIN', 'ADMIN'),
  CategoryControllers.getSingleCategory,
);

// ---------------->> Delete Category Route <<-----------------
router.delete(
  '/:categoryId',
  authValidator('SUPER_ADMIN'),
  CategoryControllers.deleteCategory,
);

// export Category routes
export const CategoryRoutes = router;
