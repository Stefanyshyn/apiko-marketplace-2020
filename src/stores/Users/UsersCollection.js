import { useStore } from '../createStore';
import { createCollection, asyncModel } from '../utils';
import { UserModel } from './UserModel';
import api from '../../service/api';
import { User } from '../schemas';

export function useUsersCollection() {
  const store = useStore();
  return store.entities.users;
}

export const UsersCollection = createCollection(UserModel, {
  fetchById: asyncModel(fetchById),
});

function fetchById(id) {
  return async function fetchByIdFlow(flow, store, root) {
    const result = await api.user.getUser(id);

    store.merge(result.data, User);
  };
}
