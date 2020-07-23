import { useStore } from '../createStore';
import { createCollection } from '../utils';
import { UserModel } from './UserModel';

export function useUsersCollection() {
  const store = useStore();
  return store.entities.users;
}

export const UsersCollection = createCollection(UserModel, {});
