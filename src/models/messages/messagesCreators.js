import { v4 } from 'uuid';

export const createMessage = ({ chatId, ownerId, text }) => {
  return {
    id: v4(),
    updateAt: Date.now(),
    text,
    chatId,
    isLoading: true,
    isError: true,
    ownerId,
  };
};
