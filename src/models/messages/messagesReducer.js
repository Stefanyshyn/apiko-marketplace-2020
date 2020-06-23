import { handleActions } from '@letapp/redux-actions';
import * as actions from './messagesActions';

const initialState = {
  list: {
    //chatId:[messages]
  },
  settingFetch: {
    //chatId:{from, hasMessages, scrollToIndex}
  },
  sendMessage: {
    isLoading: false,
    isError: false,
    error: null,
  },
  fetchMessages: {
    isLoading: false,
    isError: false,
    error: null,
  },
};

export default handleActions(
  {
    [actions.sendMessage.start]: (
      state,
      { payload: { result, chatId } },
    ) => {
      let _state = {
        ...state,
        settingFetch: {
          ...state.settingFetch,
          [chatId]: {
            ...state.settingFetch[chatId],
            scrollToIndex: state.list[chatId]?.length,
          },
        },
        list: {
          ...state.list,
          [chatId]: state.list[chatId]
            ? [...state.list[chatId], result]
            : [result],
        },
        sendMessage: {
          ...state.sendMessage,
          isLoading: true,
          isError: false,
          error: null,
        },
      };
      return _state;
    },
    [actions.sendMessage.success]: (
      state,
      { payload: { result, chatId, tempMessageId } },
    ) => ({
      ...state,
      settingFetch: {
        ...state.settingFetch,
        [chatId]: {
          ...state.settingFetch[chatId],
          scrollToIndex: state.list[chatId]?.length,
        },
      },
      list: {
        ...state.list,
        [chatId]: state.list[chatId]
          ? [
              ...state.list[chatId].filter(
                (messageId) => messageId !== tempMessageId,
              ),
              result,
            ]
          : [result],
      },
      sendMessage: {
        ...state.sendMessage,
        isLoading: false,
      },
    }),
    [actions.sendMessage.error]: (state, action) => ({
      ...state,
      sendMessage: {
        ...state.sendMessage,
        isLoading: false,
        isError: true,
        error: action.payload,
      },
    }),

    [actions.fetchMessages.start]: (state) => ({
      ...state,
      fetchMessages: {
        ...state.fetchMessages,
        isLoading: true,
        isError: false,
        error: null,
      },
    }),
    [actions.fetchMessages.success]: (
      state,
      { payload: { result, chatId } },
    ) => {
      return {
        ...state,
        settingFetch: {
          ...state.settingFetch,
          [chatId]: {
            ...state.settingFetch[chatId],
            from: result.length ? result[result.length - 1] : -1,
            hasMessages: result.length === 0 ? false : true,
            scrollToIndex: result.length,
          },
        },
        list: {
          ...state.list,
          [chatId]: state.list[chatId]
            ? [...result.reverse(), ...state.list[chatId]]
            : [...result.reverse()],
        },
        fetchMessages: {
          ...state.fetchMessages,
          isLoading: false,
        },
      };
    },
    [actions.fetchMessages.error]: (state, action) => ({
      ...state,
      fetchMessages: {
        ...state.fetchMessages,
        isLoading: false,
        isError: true,
        error: action.payload,
      },
    }),
  },
  initialState,
);
