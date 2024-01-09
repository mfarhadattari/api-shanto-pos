import express from 'express';
import { AdminRoutes } from '../models/admin/admin.route';
import { AuthRoutes } from '../models/auth/auth.route';
import { CategoryRoutes } from '../models/category/category.route';
import { ProductRoutes } from '../models/product/product.route';

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
  {
    path: '/products',
    routes: ProductRoutes,
  },
];

applicationRoutes.map((route) => router.use(route.path, route.routes));

export default router;
