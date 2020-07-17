import { types } from 'mobx-state-tree';
import { ProductModel } from './ProductModel';
import { asyncModel } from '../utils';
import api from '../../service/api';

export const LatestProductsStore = types
  .model('LatestProductsStore', {
    items: types.array(types.reference(ProductModel)),

    fetchLatest: asyncModel(fetchLatest),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));

function fetchLatest({ limit, from }) {
  return async function fetchLatestFlow(flow, store, root) {
    const result = await api.products.getLatest({ limit, from });
    try {
      const ids = result.data.map((product) => {
        root.entities.products.add(product.id, product);
        return product.id;
      });
      store.setItems(ids);
    } catch (e) {
      console.log(e);
    }
  };
}
