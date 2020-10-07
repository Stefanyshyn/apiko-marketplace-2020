import { types as t } from 'mobx-state-tree';
import { useStore } from '../createStore';
import { asyncModel } from '../utils';
import api from '../../service/api';

export function useLogin() {
  const store = useStore();
  return store.auth.login;
}

export const LoginStore = t
  .model({
    email: t.optional(t.string, ''),
    password: t.optional(t.string, ''),
    loginFlow: asyncModel(loginFlow),
  })
  .actions((store) => ({
    reset() {
      store.email = '';
      store.password = '';
    },
    setEmail(text) {
      store.email = '' + text;
    },
    setPassword(text) {
      store.password = '' + text;
    },
  }));

function loginFlow() {
  return async (flow, store, root) => {
    let { data } = await api.auth.login(store.email, store.password);
    api.auth.setToken(data.token);

    root.auth.setIsLoggedIn(true);
    root.viewer.setViewer(data.user);
  };
}
