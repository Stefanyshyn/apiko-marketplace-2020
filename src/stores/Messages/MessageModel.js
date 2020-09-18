import { types as t } from 'mobx-state-tree';

export const MessageModel = t.model('MessageModel', {
  id: t.identifierNumber,
  chatId: t.number,
  ownerId: t.number,
  text: t.string,
  read: t.boolean,
  createdAt: t.string,
  updatedAt: t.string,
});
