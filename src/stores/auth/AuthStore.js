import { types as t, getRoot } from 'mobx-state-tree';
import api from '../../service/api';
import { useStore } from '../createStore';
import { LoginStore } from './LoginStore';
import { RegisterStore } from './RegisterStore';

export function useAuth() {
  const store = useStore();
  return store.auth;
}

export const AuthStore = t
  .model({
    isLoggedIn: false,
    register: t.optional(RegisterStore, {}),
    login: t.optional(LoginStore, {}),
  })
  .actions((store) => ({
    setIsLoggedIn(value) {
      store.isLoggedIn = value;
    },
    logout() {
      store.isLoggedIn = false;
      api.auth.logout();
      getRoot(store).viewer.setViewer(undefined);
    },
  }));
