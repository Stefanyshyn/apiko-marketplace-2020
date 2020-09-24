import { types } from 'mobx-state-tree';
import { UserModel } from './Users/UserModel';
import { useStore } from './createStore';
import { asyncModel } from './utils';
import api from '../service/api';
import { UserSchema } from './schemas';

const ViewerModel = UserModel.named('ViewerStore');

export const ViewerStore = types
  .model('ViewerStore', {
    user: types.maybe(ViewerModel),
    editUser: asyncModel(editUser),
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

function editUser(avatar, fullName, phone, location) {
  return async function editUserFlow(flow, store) {
    let newAvatar = avatar;

    if (typeof avatar === 'object') {
      let result = await api.upload.image(avatar);
      newAvatar = result.data;
    }
    const { data } = await api.user.changeCurrentUser(
      newAvatar,
      fullName,
      phone,
      location,
    );

    store.setViewer(data);
    flow.merge(data, UserSchema);
  };
}
