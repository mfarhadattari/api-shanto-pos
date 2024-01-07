import express from 'express';
import authValidator from '../../middlewares/authValidator';
import reqBodyValidator from '../../middlewares/reqBodyValidator';
import { AdminControllers } from './admin.controller';
import { createAdminValidationSchema } from './admin.validation';

// initialize router
const router = express.Router();

// ---------------->> Create Admin Route <<-----------------
router.post(
  '/',
  authValidator('SUPER_ADMIN'),
  reqBodyValidator(createAdminValidationSchema),
  AdminControllers.createAdmin,
);

// ---------------->> Get All Admin Route <<-----------------
router.get('/', authValidator('SUPER_ADMIN'), AdminControllers.getAllAdmin);

// ---------------->> Get Single Admin Route <<-----------------
router.get(
  '/:adminId',
  authValidator('SUPER_ADMIN'),
  AdminControllers.getSingleAdmin,
);

// ---------------->> Block or Unblock Admin Route <<-----------------
router.patch(
  '/block-admin/:adminId',
  authValidator('SUPER_ADMIN'),
  AdminControllers.blockOrUnblockAdmin,
);

// export admin routes
export const AdminRoute = router;
