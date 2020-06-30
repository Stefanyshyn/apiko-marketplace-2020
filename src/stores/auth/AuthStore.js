import { types as t, getRoot } from 'mobx-state-tree';
import { RegisterStore } from './RegisterStore';
import { asyncModel } from '../utils';
import api from '../../service/api';

export const AuthStore = t
  .model({
    login: asyncModel(loginFlow),
    isLoggedIn: false,
    register: t.optional(RegisterStore, {}),
  })
  .actions((store) => ({
    setIsLoggedIn(value) {
      store.isLoggedIn = value;
    },
    logout() {
      store.isLoggedIn = false;
      api.auth.logout();
      getRoot(store).viewer.setViewer(null);
    },
  }));

function loginFlow({ password, email }) {
  return async (flow) => {
    let { data } = await api.auth.login({ password, email });
    console.log('get data', data);
    api.auth.setToken(data.token);

    getRoot(flow).viewer.setViewer(data.user);
  };
}
