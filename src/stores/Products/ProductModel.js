import { types, getRoot, getSnapshot } from 'mobx-state-tree';
import { UserModel } from '../Users/UserModel';
import { safeReference, asyncModel } from '../utils';
import api from '../../service/api';
import { Chat } from '../schemas';

export const ProductModel = types
  .model('ProductModel', {
    id: types.identifierNumber,
    ownerId: types.number,
    title: types.string,
    description: types.maybeNull(types.string),
    photos: types.maybeNull(types.array(types.string)),
    location: types.string,
    price: types.number,
    saved: false,
    createdAt: types.string,
    updatedAt: types.string,

    chatId: types.maybe(types.number),
    owner: types.maybe(types.late(() => safeReference(UserModel))),

    save: asyncModel(save),
    unsave: asyncModel(unsave),

    createChat: asyncModel(createChat, false),
  })
  .preProcessSnapshot((snapshot) => ({
    ...snapshot,
    onwer: snapshot.ownerId,
  }))
  .actions((store) => ({
    fetchOwner() {
      getRoot(store).entities.users.fetchById.run(store.ownerId);
      store.owner = store.ownerId;
    },
    setSaved(value) {
      store.saved = !!value;
    },
  }));

function save() {
  return async function saveFlow(flow, store, root) {
    _saved(flow, store)(api.products.save);
  };
}
function unsave() {
  return async function unsaveFlow(flow, store, root) {
    _saved(flow, store)(api.products.deleteSaved);
  };
}

function createChat(message) {
  return async function fetchChatsFlow(flow, store) {
    let chatId;
    try {
      flow.start();

      const { data: chat } = await api.chats.createChat(
        store.id,
        message,
      );
      chatId = chat.id;
      store.chatId = chat.id;
      chat.participants = [getSnapshot(store.owner)];

      flow.merge(chat, Chat);

      flow.success();
    } catch (err) {
      flow.error(err);
      throw err;
    }
    return chatId;
  };
}

function _saved(flow, store) {
  return async (handlerSaved) => {
    store.setSaved(!store.saved);
    await handlerSaved(store.id);
    if (!flow.isLoading && flow.isError) store.setSaved(!store.saved);
  };
}
