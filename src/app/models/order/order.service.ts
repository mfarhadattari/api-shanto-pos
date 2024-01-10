import { JwtPayload } from 'jsonwebtoken';
import { ICreateOrder } from './order.interface';

// ----------->> Create Order Service <<--------------
const createOrder = async (adminInfo: JwtPayload, payload: ICreateOrder) => {
  console.log({ adminInfo, payload });
};

// ----------->> Export Order Services <<--------------
export const OrderServices = { createOrder };
