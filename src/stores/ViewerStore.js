import { types } from 'mobx-state-tree';
import { UserModel } from './Users/UserModel';
import { useStore } from './createStore';

const ViewerModel = UserModel.named('ViewerStore');

export const ViewerStore = types
  .model('ViewerStore', {
    user: types.maybe(ViewerModel),
  })
  .actions((store) => ({
    setViewer(user) {
      store.user = user;
    },
  }));

export function useViewer() {
  const store = useStore();
  return store.viewer;
}
