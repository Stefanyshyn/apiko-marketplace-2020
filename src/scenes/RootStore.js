import { types as t } from 'mobx-state-tree';
import { AuthStore } from './auth/AuthStore';
import { ViewerStore } from './ViewerStore';
import api from '../service/api';
import { EntitiesStore } from './EntitiesStore';
import { ProductStore } from './Products/ProductStore';

export const RootStore = t
  .model('RootStore', {
    auth: t.optional(AuthStore, {}),
    viewer: t.optional(ViewerStore, {}),
    entities: t.optional(EntitiesStore, {}),
    products: t.optional(ProductStore, {}),
  })
  .actions((store) => ({
    async bootstrap() {
      try {
        let result = await api.user.getCurrentUser();
        if (!result) return;
        store.viewer.setViewer(result.data);
      } catch (err) {
        store.auth.logout();
      }
    },
  }));
