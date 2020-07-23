import {
  types,
  onSnapshot,
  applySnapshot,
  getParent,
  getRoot,
  isStateTreeNode,
  getIdentifier,
  resolveIdentifier,
} from 'mobx-state-tree';
import { setPersist, getPersist } from '../service/localStorage';
import { normalize } from 'normalizr';
export function asyncModel(thunk, auto = true) {
  const model = types
    .model('AsyncModel', {
      isLoading: false,
      isError: false,
    })
    .actions((store) => ({
      start() {
        store.isLoading = true;
        store.isError = false;
      },
      success() {
        store.isLoading = false;
      },
      error(err) {
        store.isLoading = false;
        store.isError = true;
      },
      run(...args) {
        const promise = thunk(...args)(
          store,
          getParent(store),
          getRoot(store),
        );
        if (auto) {
          return store._auto(promise);
        }
        return promise;
      },
      merge(data, schema) {
        const { entities, result } = normalize(data, schema);
        getRoot(store).entities.merge(entities);
        return result;
      },
      async _auto(promise) {
        try {
          store.start();

          await promise;
          store.success();
        } catch (err) {
          store.error(err);
        }
      },
    }));
  return types.optional(model, {});
}

export function createPersist(store) {
  onSnapshot(store, (snapshot) => {
    setPersist({
      auth: { isLoggedIn: snapshot.auth.isLoggedIn },
      viewer: { user: snapshot.viewer.user },
      // latestProducts: {
      //   items: snapshot.latestProducts.items,
      // },
      //      entities: snapshot.entities,
    });
  });

  function rehydrate() {
    const snapshot = getPersist();
    if (snapshot) {
      applySnapshot(store, snapshot);
    }
  }
  return {
    rehydrate,
  };
}

export function createCollection(ofModel, asyncModel = {}) {
  const collection = types
    .model('CollectionModel', {
      collection: types.map(ofModel),
      ...asyncModel,
    })
    .views((store) => ({
      get(key) {
        return store.collection.get(String(key));
      },
    }))
    .actions((store) => ({
      add(key, value) {
        store.collection.set(String(key), value);
      },
    }));

  return types.optional(collection, {});
}

export function safeReference(T) {
  return types.reference(T, {
    get(identifier, parent) {
      if (isStateTreeNode(identifier)) {
        identifier = getIdentifier(identifier);
      }
      return resolveIdentifier(T, parent, identifier);
    },
    set(value) {
      return value;
    },
  });
}
