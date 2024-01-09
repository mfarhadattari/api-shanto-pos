import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

// ---------------->> Create Product Controller <<-----------------
const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProduct(req.body);

  sendResponse(res, {
    status: httpStatus.CREATED,
    message: 'Product created successfully',
    data: result,
  });
});

// ---------------->> Get All Product Controller <<-----------------
const getAllProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProduct(req.query);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Products retrieve successfully',
    data: result,
  });
});

// ---------------->> Get Single Product Controller <<-----------------
const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getSingleProduct(req.params.productId);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Product retrieve successfully',
    data: result,
  });
});

// ---------------->> Update Product Controller <<-----------------
const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.updateProduct(
    req.params.productId,
    req.body,
  );

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Product updated successfully',
    data: result,
  });
});

// ---------------->> Delete Product Controller <<-----------------
const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.deleteProduct(req.params.productId);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'Product deleted successfully',
    data: result,
  });
});

// ---------------->> Export Product Controllers <<-----------------
export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
