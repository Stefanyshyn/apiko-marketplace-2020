import * as actions from './chatsActions';
import API from '../../service/api';
import { normalize } from 'normalizr';
import { Chat, ChatList } from '../../service/api/schemas';

export function createChat(id, text) {
  return async function createChatThunk(dispatch) {
    try {
      dispatch(actions.createChat.start());

      const result = await API.chats.createChat(id, text);

      const normalizedData = normalize(result.data, Chat);
      dispatch(actions.createChat.success(normalizedData));
      // eslint-disable-next-line no-throw-literal
      throw { chatId: normalizedData.result };
    } catch (err) {
      if (err.chatId) throw err;
      dispatch(actions.createChat.error({ message: err.message }));
    }
  };
}
export function fetchChats() {
  return async function fetchChatsThunk(dispatch) {
    try {
      dispatch(actions.fetchChats.start());

      const result = await API.chats.getChats();

      const normalizedData = normalize(result.data, ChatList);
      dispatch(actions.fetchChats.success(normalizedData));
    } catch (err) {
      dispatch(actions.fetchChats.error({ message: err.message }));
      throw err;
    }
  };
}
