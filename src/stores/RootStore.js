import { types as t } from 'mobx-state-tree';
import { AuthStore } from './auth/AuthStore';
import { ViewerStore } from './ViewerStore';
import api from '../service/api';
import { LatestProductsStore } from './Products/LatestProdutsStore';
import { EntitiesStore } from './EntitiesStore';

export const RootStore = t
  .model('RootStore', {
    auth: t.optional(AuthStore, {}),
    viewer: t.optional(ViewerStore, {}),
    entities: t.optional(EntitiesStore, {}),
    latestProducts: t.optional(LatestProductsStore, {}),
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
