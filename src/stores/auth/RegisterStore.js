import { types as t } from 'mobx-state-tree';
import api from '../../service/api';
import { useStore } from '../createStore';
import { asyncModel } from '../utils';
export function useRegister() {
  const store = useStore();
  return store.auth.register;
}
export const RegisterStore = t
  .model({
    email: t.optional(t.string, ''),
    fullname: t.optional(t.string, ''),
    password: t.optional(t.string, ''),

    registerFlow: asyncModel(registerFlow),
  })
  .actions((store) => ({
    reset() {
      store.email = '';
      store.password = '';
      store.fullname = '';
    },
    setEmail(text) {
      store.email = text;
    },
    setFullname(text) {
      store.fullname = text;
    },
    setPassword(text) {
      store.password = text;
    },
  }));

function registerFlow() {
  return async (flow, store, root) => {
    let { data } = await api.auth.register(
      store.email,
      store.fullname,
      store.password,
    );
    api.auth.setToken(data.token);

    root.auth.setIsLoggedIn(true);
    root.viewer.setViewer(data.user);
  };
}
