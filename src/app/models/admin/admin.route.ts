import express from 'express';
import { AdminControllers } from './admin.controller';

// initialize router
const router = express.Router();

// ---------------->> Create Admin Route <<-----------------
router.post('/', AdminControllers.createAdmin);

// export admin routes
export const AdminRoute = router;
