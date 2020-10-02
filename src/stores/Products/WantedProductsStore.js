import { types } from 'mobx-state-tree';
import { ProductModel } from './ProductModel';
import { asyncModel } from '../utils';
import api from '../../service/api';
import { ProductCollecitionSchema } from '../schemas';
import { useStore } from '../createStore';

export function useWantedProductStore() {
  return useStore((store) => store.products.wantedProducts);
}

export const WantedProductsStore = types
  .model('WantedProductsStore', {
    items: types.maybeNull(
      types.array(types.reference(ProductModel)),
    ),
    priceFrom: types.maybe(types.number),
    priceTo: types.maybe(types.number),

    limit: 30,

    fetch: asyncModel(fetchProducts),
  })
  .actions((store) => ({
    setItems(value) {
      store.items = value;
    },
    setPriceFrom(value) {
      store.priceFrom = value;
    },
    setPriceTo(value) {
      store.priceTo = value;
    },
  }));

function fetchProducts({ keywords, location }) {
  return async function fetchProductsFlow(flow, store) {
    const { data } = await api.products.getProductsByFilter({
      limit: store.limit,
      offset: store.items?.length | 0,
      keywords,
      location,
      priceFrom: store.priceFrom,
      priceTo: store.priceTo,
    });
    const results = flow.merge(data, ProductCollecitionSchema);
    store.setItems(results);
  };
}
