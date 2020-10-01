import { types as t } from 'mobx-state-tree';
import api from '../../service/api';
import { asyncModel } from '../utils';
import { ProductSchema } from '../schemas';
import { useStore } from '../createStore';

export function useSavedProductStore() {
  return useStore((store) => store.products.savedProduct);
}

export const SavedProductStore = t
  .model('AddProductStore', {
    title: t.maybeNull(t.string),
    location: t.maybeNull(t.string),
    description: t.maybeNull(t.string),
    price: t.maybeNull(t.number),

    fetch: asyncModel(fetchProduct),
  })
  .actions((store) => ({
    setTitle(value) {
      store.title = value;
    },
  }));

function fetchProduct() {
  return async function fetchProductFlow(flow, store) {
    const { data } = await api.products.getSaved();
    flow.merge(data, ProductSchema);
    store.reset();
  };
}
