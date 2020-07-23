import { types } from 'mobx-state-tree';
import { ProductModel } from './ProductModel';
import { asyncModel } from '../utils';
import api from '../../service/api';
import { LatestProductColllection } from '../schemas';
import { normalize } from 'normalizr';
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
    const normalizedData = normalize(
      result.data,
      LatestProductColllection,
    );
    root.entities.merge(normalizedData.entities);
    store.setItems(normalizedData.result);
  };
}
