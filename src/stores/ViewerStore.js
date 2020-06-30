import { types } from 'mobx-state-tree';
import { UserModel } from './UserModel';

export const ViewerStore = types
  .model('ViewerStore', {
    user: types.maybe(UserModel),
  })
  .actions((store) => ({
    setViewer(userObject) {
      if (userObject) {
        const userModel = UserModel.create(userObject);
        store.user = userModel;
      } else store.user = undefined;
    },
  }));
