import { types as t } from 'mobx-state-tree';

export const AppStore = t
  .model('AppStore', {
    isLoadingProgressBar: false,
  })
  .actions((store) => ({
    setLoadingProgressBar(value) {
      store.isLoadingProgressBar = value;
    },
  }));
