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

// ---------------->> Get Single Category Controller <<-----------------

// ---------------->> Delete Category Controller <<-----------------

// ---------------->> Export Category Controllers <<-----------------
export const CategoryControllers = { createCategory };
