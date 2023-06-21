import Exception from "../exception/exception.js";
import product from "../model/product.js";

async function addProduct({ name, price, image, type }) {
  const newProduct = await product.create({ name, price, image, type });
  return newProduct;
}

// async function listProduct() {
//   const getListProduct = await product.find();
//   return getListProduct;
// }
export default {
  addProduct,
  // listProduct,
};
