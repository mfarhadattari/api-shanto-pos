import { IProduct } from './product.interface';

// ---------------->> Create Product Service <<-----------------
const createProduct = async (payload: IProduct) => {
  console.log(payload);
};

// ---------------->> Get All Product Service <<-----------------
const getAllProduct = async (query: Record<string, unknown>) => {
  console.log(query);
};

// ---------------->> Get Single Product Service <<-----------------
const getSingleProduct = async (productId: string) => {
  console.log({ productId });
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
