import { types as t } from 'mobx-state-tree';
import api from '../../service/api';
import { asyncModel } from '../utils';
import { ProductCollecitionSchema } from '../schemas';
import { useStore } from '../createStore';
import { ProductModel } from './ProductModel';

export function useSavedProductStore() {
  return useStore((store) => store.products.savedProducts);
}

export const SavedProductStore = t
  .model('AddProductStore', {
    items: t.array(t.reference(ProductModel)),
    limit: 30,

    fetch: asyncModel(fetchProduct),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));

function fetchProduct() {
  return async function fetchProductFlow(flow, store) {
    const { data } = await api.products.getSaved(store.limit);

    const result = flow.merge(data, ProductCollecitionSchema);
    store.setItems(result);
  };
}
