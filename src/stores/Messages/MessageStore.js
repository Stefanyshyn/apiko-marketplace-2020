import { getParent, getRoot, types as t } from 'mobx-state-tree';
import api from '../../service/api';
import { MessageSchema, MessageCollectionSchema } from '../schemas';
import { asyncModel } from '../utils';
import { MessageModel } from './MessageModel';

export const MessageStore = t
  .model('MessageStore', {
    items: t.array(t.reference(MessageModel)),

    fetchMessages: asyncModel(fetchMessages),
  })
  .views((store) => ({
    asList() {
      return store.items.slice().reverse();
    },
  }))
  .actions((store) => ({
    setMessages(messagesId) {
      store.items = messagesId;
    },
    addMessage(message) {
      const result = getRoot(store).entities.normalize(
        message,
        MessageSchema,
      );
      store.items.unshift(result);
    },
  }));

function fetchMessages(limit, from) {
  return async function fetchMessagesFlow(flow, store) {
    const { data } = await api.messages.fetchMessages(
      getParent(store).id,
      limit,
      from,
    );
    const result = flow.merge(data, MessageCollectionSchema);

    store.setMessages(result);
  };
}
