import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import QueryBuilder from '../../utils/QueryBuilder';
import { Category } from '../category/category.model';
import { IProduct } from './product.interface';
import { Product } from './product.model';

// ---------------->> Create Product Service <<-----------------
const createProduct = async (payload: IProduct) => {
  // check if product exist
  const isProductAlreadyExist = await Product.findOne({ name: payload.name });
  if (isProductAlreadyExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Product ${payload.name} is already exists`,
    );
  }

  // check category id exist
  const isCategoryExist = await Category.findById(payload.categoryId);
  if (!isCategoryExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Category id ${payload.categoryId} is not exists`,
    );
  }

  // add product in database
  const result = (await Product.create(payload)).populate('categoryId');
  return result;
};

// ---------------->> Get All Product Service <<-----------------
const getAllProduct = async (query: Record<string, unknown>) => {
  const modelQuery = Product.find().populate('categoryId');
  const productQuery = new QueryBuilder(modelQuery, query)
    .search(['name'])
    .filter()
    .sort()
    .paginate();

  const result = await productQuery.modelQuery;
  return result;
};

// ---------------->> Get Single Product Service <<-----------------
const getSingleProduct = async (productId: string) => {
  const result = await Product.findById(productId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, `Product is not exists`);
  }
  return result;
};

// ---------------->> Update Product Service <<-----------------
const updateProduct = async (productId: string, payload: Partial<IProduct>) => {
  console.log({ productId, payload });
};

// ---------------->> Delete Product Service <<-----------------
const deleteProduct = async (productId: string) => {
  console.log({ productId });
};

// ---------------->> Export Product Services <<-----------------
export const ProductServices = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
