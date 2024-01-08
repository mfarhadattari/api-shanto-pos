import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import QueryBuilder from '../../utils/QueryBuilder';
import { Category } from './category.model';

// ---------------->> Create Category Service <<-----------------
const createCategory = async (payload: { name: string }) => {
  const isCategoryAlreadyExists = await Category.findOne({
    name: payload.name,
  });
  if (isCategoryAlreadyExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Category name ${payload.name} is already exists`,
    );
  }

  const result = await Category.create(payload);
  return result;
};

// ---------------->> Get All Category Service <<-----------------
const getAllCategory = async (query: Record<string, unknown>) => {
  const modelQuery = Category.find();
  const categoryQuery = new QueryBuilder(modelQuery, query)
    .search(['name'])
    .filter()
    .sort();

  const result = await categoryQuery.modelQuery;
  return result;
};

// ---------------->> Get Single Category Service <<-----------------
const getSingleCategory = async (categoryId: string) => {
  const result = await Category.findById(categoryId);
  if (!result) {
    throw new AppError(httpStatus.CONFLICT, `Category not found`);
  }
  return result;
};

// ---------------->> Delete Category Service <<-----------------
const deleteCategory = async (categoryId: string) => {
  const isCategoryAlreadyExists = await Category.findById(categoryId);
  if (!isCategoryAlreadyExists) {
    throw new AppError(httpStatus.NOT_FOUND, `Category name is not exists`);
  }
  await Category.findByIdAndUpdate(categoryId, {
    isDeleted: true,
  });
  return null;
};

// ---------------->> Export Category Services <<-----------------
export const CategoryServices = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  deleteCategory,
};
