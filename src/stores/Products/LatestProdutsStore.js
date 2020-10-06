import { getRoot, types } from 'mobx-state-tree';
import { ProductModel } from './ProductModel';
import { asyncModel } from '../utils';
import api from '../../service/api';
import { LatestProductColllectionSchema } from '../schemas';
import { useStore } from '../createStore';

export const LatestProductsStore = types
  .model('LatestProductsStore', {
    items: types.array(types.reference(ProductModel)),
    limit: 10,
    hasNextProduct: true,
    fetchLatest: asyncModel(fetchLatest, false),
    isReset: false,
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
    setHasNextProduct(value) {
      store.hasNextProduct = !!value;
    },
    setIsReset(value) {
      store.isReset = !!value;
    },
    reset() {
      store.isReset = true;
    },
  }));

function fetchLatest() {
  return async function fetchLatestFlow(flow, store) {
    try {
      flow.start();
      const { data } = await api.products.getLatest(
        store.limit,
        store.isReset
          ? null
          : store.items[store.items.length - 1]?.id,
      );
      const result = flow.merge(data, LatestProductColllectionSchema);
      !store.items.length || store.isReset
        ? store.setItems(result)
        : store.setItems([
            ...store.items.map((item) => item.id),
            ...result,
          ]);
      store.setHasNextProduct(result.length === store.limit);
      flow.success();
    } catch (err) {
      flow.error(err);
    } finally {
      getRoot(store).app.setLoadingProgressBar(false);
      store.setIsReset(false);
    }
  };
}

export function useLatestProductsStore() {
  const store = useStore();
  return store.products.latestProducts;
}
