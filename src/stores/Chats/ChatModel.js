import { types as t } from 'mobx-state-tree';
import { ProductModel } from '../Products/ProductModel';
import { UserModel } from '../Users/UserModel';
import { MessageModel } from '../Messages/MessageModel';
import { MessageStore } from '../Messages/MessageStore';
import { useStore } from '../createStore';
import { asyncModel } from '../utils';
import api from '../../service/api';
export const ChatModel = t
  .model('ChatModel', {
    id: t.identifierNumber,
    ownerId: t.number,
    productId: t.number,
    updatedAt: t.string,
    createdAt: t.string,

    user: t.reference(UserModel),
    product: t.reference(ProductModel),
    message: t.reference(MessageModel),

    messages: t.optional(MessageStore, {}),
    sendMessage: asyncModel(sendMessage),
  })
  .preProcessSnapshot((snapshot) => {
    return {
      ...snapshot,
      product: snapshot.product || snapshot.productId,
      participants: undefined,
      user: snapshot.participants[0],
    };
  });
  function sendMessage(message) {
    return async function sendMessageFlow(flow, store) {
      const { data} = await api.messages.sendMessage(store.id, message);
      store.messages.addMessage(data)
    };
  }

export function useChat() {
  return useStore((store) => store.chats);
}
