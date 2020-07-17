import api from '../../service/api';
import { useStore } from '../createStore';

const { createCollection, asyncModel } = require('../utils');
const { ProductModel } = require('./ProductModel');

export function useProductsCollection() {
  const store = useStore();
  return store.entities.products;
}

export const ProductsCollection = createCollection(ProductModel, {
  fetchProduct: asyncModel(fetchProduct),
});

function fetchProduct(id) {
  return async function fetchProductFlow(flow, store, root) {
    try {
      const { data: product } = await api.products.getProduct(id);
      root.entities.users.add(product.owner.id, product.owner);
      store.add(product.id, {
        ...product,
        owner: product.owner.id,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
