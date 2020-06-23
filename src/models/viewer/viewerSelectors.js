import { createSelector } from 'reselect';

const getUserEntities = (state) => state.entities.users;
const getCurrentUserId = (state) => state.viewer.user;

export const getCurrentUser = createSelector(
  (state) => {
    const users = getUserEntities(state);
    const currentUserId = getCurrentUserId(state);
    return users[currentUserId];
  },
  (item) => item,
);
