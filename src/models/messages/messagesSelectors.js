import { createSelector } from 'reselect';

const getMessageEntities = (state) => state.entities.messages;
const getMessageIds = (state, chatId) =>
  state.messages.list[chatId] || [];

export const getMessages = createSelector(
  [getMessageEntities, getMessageIds],
  (entities, ids) => ids.map((id) => entities[id]),
);
