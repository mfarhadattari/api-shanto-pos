import express from 'express';
import { AdminRoute } from '../models/admin/admin.route';

// -------------->> Initialized Router <<------------------
const router = express.Router();

const applicationRoutes = [
  {
    path: '/admin',
    routes: AdminRoute,
  },
];

applicationRoutes.map((route) => router.use(route.path, route.routes));

export default router;
