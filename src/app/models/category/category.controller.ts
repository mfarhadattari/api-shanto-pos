import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

// ---------------->> Create Category Controller <<-----------------
const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategory(req.body);

  sendResponse(res, {
    status: httpStatus.CREATED,
    message: 'Category created successfully',
    data: result,
  });
});

// ---------------->> Get All Category Controller <<-----------------
const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategory(req.query);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Category retrieve successfully',
    data: result,
  });
});

// ---------------->> Get Single Category Controller <<-----------------
const getSingleCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getSingleCategory(
    req.params.categoryId,
  );

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Category retrieve successfully',
    data: result,
  });
});

// ---------------->> Delete Category Controller <<-----------------
const deleteCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.deleteCategory(req.params.categoryId);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Category deleted successfully',
    data: result,
  });
});

// ---------------->> Export Category Controllers <<-----------------
export const CategoryControllers = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  deleteCategory,
};
