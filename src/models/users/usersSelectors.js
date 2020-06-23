import { createSelector } from 'reselect';

const getUserEntities = (state) => state.entities.users;

export const getUser = createSelector(
  (state, userId) => {
    const users = getUserEntities(state);
    return users[userId];
  },
  (item) => item,
);
