import express from 'express';
import { AdminRoutes } from '../models/admin/admin.route';
import { AuthRoutes } from '../models/auth/auth.route';
import { CategoryRoutes } from '../models/category/category.route';

// -------------->> Initialized Router <<------------------
const router = express.Router();

const applicationRoutes = [
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/admin',
    routes: AdminRoutes,
  },
  {
    path: '/categories',
    routes: CategoryRoutes,
  },
];

applicationRoutes.map((route) => router.use(route.path, route.routes));

export default router;
