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

// export admin routes
export const AdminRoute = router;
