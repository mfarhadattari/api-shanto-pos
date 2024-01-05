import { Request, Response } from 'express';
import { AdminServices } from './admin.service';

// ---------------->> Create Admin Controller <<-----------------
const createAdmin = async (req: Request, res: Response) => {
  const result = await AdminServices.createAdmin(req.body);
  res.status(200).send(result);
};

// ---------------->> Export Admin Controllers <<-----------------
export const AdminControllers = { createAdmin };
