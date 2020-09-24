import { types as t } from 'mobx-state-tree';
import api from '../../service/api';
import { useStore } from '../createStore';
import { ChatCollectionSchema } from '../schemas';
import { asyncModel } from '../utils';
import { ChatModel } from './ChatModel';

export function useChatStore() {
  return useStore((store) => store.chats);
}

export const ChatStore = t
  .model('ChatStore', {
    items: t.array(t.reference(ChatModel)),
    fetchChats: asyncModel(fetchChats),
  })
  .views((store) => ({
    get(id) {
      return store.items.find((chat) => chat.id === id);
    },
  }))
  .actions((store) => ({
    setItems(value) {
      store.items = value;
    },
    handleMessage(message) {
      if (message?.type === 'ADD') {
        debugger;
        const chat = store.items.find(
          (chat) => chat.id === message.message.chatId,
        );
        if (chat) chat.messages.addMessage(message.message);
      }
    },
  }));
function fetchChats() {
  return async function fetchChatsFlow(flow, store) {
    const { data } = await api.chats.getChats();
    const res = flow.merge(data, ChatCollectionSchema);
    store.setItems(res);
  };
}
