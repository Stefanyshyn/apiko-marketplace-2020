import * as actions from './messagesActions';
import API from '../../service/api';
import { normalize } from 'normalizr';
import { Message, MessageList } from '../../service/api/schemas';
import { MessagesCreators } from '.';

export function fetchMessages(chatId, limit) {
  return async function fetchMessagesThunk(dispatch, getState) {
    const settingFetch = getState().messages.settingFetch[chatId];
    try {
      dispatch(actions.fetchMessages.start());

      const body = {
        chatId,
        limit,
      };

      if (settingFetch?.from) body.from = settingFetch.from;

      const result = await API.messages.getMessages(body);

      const normalizedData = normalize(result.data, MessageList);

      dispatch(
        actions.fetchMessages.success({ ...normalizedData, chatId }),
      );
    } catch (err) {
      dispatch(actions.fetchMessages.error({ message: err }));
    }
  };
}
export function sendMessage(chatId, text) {
  return async function sendMessageThunk(dispatch, getState) {
    const tempMessage = MessagesCreators.createMessage({
      chatId,
      text,
      ownerId: getState().viewer.user,
    });
    const normalizedDataTemp = normalize(tempMessage, Message);
    try {
      dispatch(
        actions.sendMessage.start({ chatId, ...normalizedDataTemp }),
      );

      const result = await API.messages.sendMessage(chatId, text);
      const normalizedData = normalize(result.data, Message);
      normalizedDataTemp.entities.messages[
        normalizedDataTemp.result
      ].isLoading = false;
      normalizedDataTemp.entities.messages[
        normalizedDataTemp.result
      ].isError = false;
      dispatch(
        actions.sendMessage.success({
          ...normalizedData,
          chatId,
          tempMessageId: tempMessage.id,
        }),
      );
    } catch (err) {
      normalizedDataTemp.entities.messages[
        normalizedDataTemp.result
      ].isLoading = true;

      dispatch(
        actions.sendMessage.error({
          message: err.message,
          result: normalizedDataTemp.result,
          entities:
            normalizedDataTemp.entities.messages[
              normalizedDataTemp.result
            ],
        }),
      );
    }
  };
}

export function handleMessageRealtime(evt) {
  return async function handleMessageRealtimeThunk(dispatch) {
    if (evt.type === 'ADD') {
      dispatch(addMessage(evt.message));
    }
  };
}

export function addMessage(message) {
  return async function sendMessageThunk(dispatch) {
    const normalizedData = normalize(message, Message);
    dispatch(
      actions.sendMessage.success({
        ...normalizedData,
        chatId: message.chatId,
      }),
    );
  };
}
