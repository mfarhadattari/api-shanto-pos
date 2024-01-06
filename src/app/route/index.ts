import express from 'express';
import { AdminRoute } from '../models/admin/admin.route';
import { AuthRoute } from '../models/auth/auth.route';

// -------------->> Initialized Router <<------------------
const router = express.Router();

const applicationRoutes = [
  {
    path: '/admin',
    routes: AdminRoute,
  },
  {
    path: '/auth',
    routes: AuthRoute,
  },
];

applicationRoutes.map((route) => router.use(route.path, route.routes));

export default router;
