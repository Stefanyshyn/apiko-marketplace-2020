import { types, onSnapshot, applySnapshot } from 'mobx-state-tree';
import { setPersist, getPersist } from '../service/localStorage';
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
        const promise = thunk(...args)(store);
        if (auto) {
          return store._auto(promise);
        }
        return promise;
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
    setPersist({ viewer: { user: snapshot.viewer.user } });
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
