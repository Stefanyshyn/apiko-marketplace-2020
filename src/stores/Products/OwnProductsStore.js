import { types } from 'mobx-state-tree';
import { ProductModel } from '../Products/ProductModel';
import { asyncModel } from '../utils';
import api from '../../service/api';
import { OwnProductCollecition } from '../schemas';
import { useStore } from '../createStore';

export const OwnProductsStore = types
  .model('OwnProductsStore', {
    items: types.array(
      types.reference(types.late(() => ProductModel)),
    ),
    fetchOwnProducts: asyncModel(fetchOwnProducts),
  })
  .actions((store) => ({
    setItems(value) {
      store.items = value;
    },
  }));
function fetchOwnProducts(userId) {
  return async function fetchOwnProductsFlow(flow, store, root) {
    const result = await api.products.getUserProducts(userId);

    const ids = flow.merge(result.data, OwnProductCollecition);
    store.setItems(ids);
  };
}

export function useOwnProductsStore() {
  const store = useStore();
  return store.products.ownProducts;
}
