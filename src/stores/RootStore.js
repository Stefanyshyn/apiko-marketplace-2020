import { types as t } from 'mobx-state-tree';
import { AuthStore } from './auth/AuthStore';
import { ViewerStore } from './ViewerStore';
import api from '../service/api';
import { EntitiesStore } from './EntitiesStore';
import { ProductStore } from './Products/ProductStore';
import SocketApi from '../service/api/SocketApi';
import { ChatStore } from './Chats/ChatStore';

export const RootStore = t
  .model('RootStore', {
    auth: t.optional(AuthStore, {}),
    viewer: t.optional(ViewerStore, {}),
    entities: t.optional(EntitiesStore, {}),
    products: t.optional(ProductStore, {}),
    chats: t.optional(ChatStore, {}),
  })
  .actions((store) => ({
    async bootstrap() {
      try {
        let result = await api.user.getCurrentUser();
        if (!result) return;
        api.init();
        
        store.viewer.setViewer(result.data);
        store.subscribeToEvents();

        store.auth.setIsLoggedIn(true)
      } catch (err) {
        store.auth.logout();
      }
    },
    subscribeToEvents() {
      SocketApi.handleMessages((message) => {
        store.chats.handleMessage(message);
      });
    },
  }));
