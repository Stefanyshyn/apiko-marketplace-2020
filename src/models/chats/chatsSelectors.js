import { createSelector } from 'reselect';

const getChatEntities = (state) => state.entities.chats;
const getChatIds = (state) => state.chats.list;

export const getChats = createSelector(
  [getChatEntities, getChatIds],
  (entities, ids) => ids.map((id) => entities[id]),
);
