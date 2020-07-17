import { types } from 'mobx-state-tree';
import { UserModel } from './UserModel';
import { safeReference } from './utils';

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
