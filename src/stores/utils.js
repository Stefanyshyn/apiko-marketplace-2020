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
      err: '',
    })
    .actions((store) => ({
      start() {
        store.isLoading = true;
        store.isError = false;
        store.err = '';
      },
      success() {
        store.isLoading = false;
        const app = getRoot(store).app;
        app.setLoadingProgressBar(false);
      },
      error(err) {
        store.isError = true;
        store.err = String(
          err?.response?.data?.message || err?.response?.data?.error,
        );
        const app = getRoot(store).app;
        app.setLoadingProgressBar(false);
        store.isLoading = false;
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
      entities: {
        products: snapshot.entities.products,
      },
      //snapshot.entities,
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
      has(id) {
        return store.collection.has(id);
      },
    }))
    .actions((store) => ({
      add(key, value) {
        store.collection.set(String(key), value);
      },
      update(key, value) {
        const item = store.collection.get(key);
        Object.assign(item, value);
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
