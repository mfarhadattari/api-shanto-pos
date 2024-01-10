/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import mongoose, { Query } from 'mongoose';
import AppError from '../../error/AppError';
import QueryBuilder from '../../utils/QueryBuilder';
import { ICustomer } from '../customer/customer.interface';
import { Customer } from '../customer/order.model';
import { Product } from '../product/product.model';
import { ITransaction } from '../transaction/transaction.interface';
import { Transaction } from '../transaction/transaction.model';
import { ICreateOrder, IOrder } from './order.interface';
import { Order } from './order.model';

// ----------->> Create Order Service <<--------------
const createOrder = async (adminInfo: JwtPayload, payload: ICreateOrder) => {
  // check product exist
  const isProductExist = await Product.find({
    _id: {
      $in: payload.products.map((each) => each.product),
    },
  });
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // create a transaction
    const transactionInfo: ITransaction = {
      paymentBy: payload.paymentBy,
      paymentId: payload.paymentId,
      paymentAt: payload.paymentAt,
      amount: payload.amount,
      createdBy: adminInfo.username,
    };

    const createdTransaction = await Transaction.create([transactionInfo], {
      session: session,
    });

    if (!(createdTransaction.length > 0)) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create transaction',
      );
    }

    // save customer information
    const customerInfo: ICustomer = {
      name: payload.name,
      email: payload?.email,
      phone: payload.phone,
      address: payload.address,
    };

    const savedCustomer = await Customer.create([customerInfo], {
      session: session,
    });

    if (!(savedCustomer.length > 0)) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to save customer information',
      );
    }

    // create order
    const orderInfo: IOrder = {
      transactionId: createdTransaction[0]._id,
      customerId: savedCustomer[0]._id,
      products: payload.products,
      totalAmount: payload.amount,
      createdBy: adminInfo.username,
    };

    const createdOrder = await Order.create([orderInfo], {
      session: session,
    });

    if (!(createdOrder.length > 0)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create order');
    }

    // decrease stock
    const orderProducts = createdOrder[0].products;
    const productUpdates = orderProducts.map((eachProduct) => ({
      updateOne: {
        filter: { _id: eachProduct.product },
        update: { $inc: { stock: -eachProduct.quantity } },
      },
    }));

    const decreasedStock = await Product.bulkWrite(productUpdates, {
      session: session,
    });

    if (
      !(decreasedStock.modifiedCount > 0) ||
      decreasedStock.modifiedCount !== orderProducts.length
    ) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to decrease stock');
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Order.findById(createdOrder[0]._id).populate(
      'transactionId customerId products.product',
    );

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

// ----------->> Get All Orders Service <<--------------
const getAllOrders = async (
  adminInfo: JwtPayload,
  query: Record<string, unknown>,
) => {
  const role = adminInfo.role;
  let modelQuery: Query<IOrder[], IOrder>;
  if (role === 'ADMIN') {
    modelQuery = Order.find({ createdBy: adminInfo.username });
  } else if (role === 'SUPER_ADMIN') {
    modelQuery = Order.find();
  } else {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Unauthorized, You are unauthorized',
    );
  }

  const orderQuery = new QueryBuilder(modelQuery, query)
    .filter()
    .sort()
    .paginate();

  const result = await orderQuery.modelQuery;
  return result;
};

// ----------->> Export Order Services <<--------------
export const OrderServices = { createOrder, getAllOrders };
