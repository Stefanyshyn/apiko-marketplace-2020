import api from '../../service/api';
import { asyncModel, createCollection } from '../utils';
import { ChatModel } from './ChatModel';
import { normalize } from 'normalizr';
import { ChatCollectionSchema } from '../schemas';
import { useStore } from '../createStore';

export const ChatsCollection = createCollection(ChatModel, {
  fetchChats: asyncModel(fetchChats),
});

function fetchChats() {
  return async function fetchChatsFlow(flow, store, root) {
    const { data: chats } = await api.chats.getChats();
    const { entities } = normalize(chats, ChatCollectionSchema);
    root.entities.merge(entities);
  };
}

export function useChatsCollection() {
  const store = useStore();
  return store.entities.chats;
}
