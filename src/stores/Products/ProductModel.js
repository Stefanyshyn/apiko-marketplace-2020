import { types, getRoot } from 'mobx-state-tree';
import { UserModel } from '../Users/UserModel';
import { safeReference, asyncModel } from '../utils';
import api from '../../service/api';

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
    owner: types.maybe(types.late(() => safeReference(UserModel))),
    save: asyncModel(save),
    unsave: asyncModel(unsave),
  })
  .preProcessSnapshot((snapshot) => ({
    ...snapshot,
    onwer: snapshot.ownerId,
  }))
  .actions((store) => ({
    fetchOwner() {
      getRoot(store).entities.user.fetchById.run(store.ownerId);

      store.owner = store.ownerId;
    },
    setSaved(value) {
      store.saved = !!value;
    },
  }));

function save() {
  return async function saveFlow(flow, store, root) {
    saved(flow, store)(api.products.save);
  };
}
function unsave() {
  return async function unsaveFlow(flow, store, root) {
    saved(flow, store)(api.products.deleteSaved);
  };
}

function saved(flow, store) {
  return async (handlerSaved) => {
    store.setSaved(!store.saved);
    await handlerSaved(store.id);
    if (!flow.isLoading && flow.isError) store.setSaved(!store.saved);
  };
}
