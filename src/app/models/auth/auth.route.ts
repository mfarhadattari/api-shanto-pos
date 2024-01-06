import express from 'express';
import authValidator from '../../middlewares/authValidator';
import reqBodyValidator from '../../middlewares/reqBodyValidator';
import { AuthControllers } from './auth.controller';
import {
  changePasswordValidationSchema,
  loginAdminValidationSchema,
} from './auth.validation';

// initialize router
const router = express.Router();

// ---------------->> Login Admin Route <<-----------------
router.post(
  '/login',
  reqBodyValidator(loginAdminValidationSchema),
  AuthControllers.loginAdmin,
);

// ---------------->> Change Password Route <<-----------------
router.post(
  '/change-password',
  authValidator('ADMIN', 'SUPER_ADMIN'),
  reqBodyValidator(changePasswordValidationSchema),
  AuthControllers.changePassword,
);

// export auth routes
export const AuthRoute = router;
