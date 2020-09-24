import { getParent, types } from 'mobx-state-tree';
import { ProductModel } from '../Products/ProductModel';
import { asyncModel } from '../utils';
import api from '../../service/api';
import { OwnProductCollecitionSchema } from '../schemas';

export const OwnProductsStore = types
  .model('OwnProductsStore', {
    items: types.maybeNull(
      types.array(types.reference(types.late(() => ProductModel))),
    ),
    fetch: asyncModel(fetchOwnProducts),
  })
  .actions((store) => ({
    setItems(value) {
      store.items = value;
    },
  }));
function fetchOwnProducts() {
  return async function fetchOwnProductsFlow(flow, store) {
    const {
      data: { list },
    } = await api.products.getUserProducts(getParent(store).id);
    const ids = flow.merge(list, OwnProductCollecitionSchema);
    store.setItems(ids);
  };
}
