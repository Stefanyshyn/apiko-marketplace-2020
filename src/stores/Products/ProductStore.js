import { types as t } from 'mobx-state-tree';
import { AddProductStore } from './AddProductStore';
import { LatestProductsStore } from './LatestProdutsStore';
import { OwnProductsStore } from './OwnProductsStore';

export const ProductStore = t.model('ProductStore', {
  latestProducts: t.optional(LatestProductsStore, {}),
  ownProducts: t.optional(OwnProductsStore, {}),
  addProduct: t.optional(AddProductStore, {}),
});
