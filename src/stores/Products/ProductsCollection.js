import api from '../../service/api';

const { createCollection, asyncModel } = require('../utils');
const { ProductModel } = require('./ProductModel');

export const ProductsCollection = createCollection(ProductModel, {
  fetchProduct: asyncModel(fetchProduct),
});
function fetchProduct(id) {
  return async function fetchProductFlow(flow, store, root) {
    const { data: product } = await api.products.getProduct(id);

    root.entities.products.add(product.id, product);
  };
}
