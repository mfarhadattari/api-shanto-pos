import express from 'express';
import reqBodyValidator from '../../middlewares/reqBodyValidator';
import { AuthControllers } from './auth.controller';
import { loginAdminValidationSchema } from './auth.validation';

// initialize router
const router = express.Router();

// ---------------->> Login Admin Route <<-----------------
router.post(
  '/login',
  reqBodyValidator(loginAdminValidationSchema),
  AuthControllers.loginAdmin,
);

// export auth routes
export const AuthRoute = router;
