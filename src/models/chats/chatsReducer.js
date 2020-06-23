import { handleActions } from '@letapp/redux-actions';
import * as actions from './chatsActions';

const initialState = {
  list: [],

  createChat: {
    isLoading: false,
    isError: false,
    error: null,
  },
  fetchChats: {
    isLoading: false,
    isError: false,
    error: null,
  },
  user: null,
};

export default handleActions(
  {
    [actions.createChat.start]: (state) => ({
      ...state,
      createChat: {
        ...state.createChat,
        isLoading: true,
        isError: false,
        error: null,
      },
    }),
    [actions.createChat.success]: (state) => ({
      ...state,
      createChat: {
        ...state.createChat,
        isLoading: false,
      },
    }),
    [actions.createChat.error]: (state, action) => ({
      ...state,
      createChat: {
        ...state.createChat,
        isLoading: false,
        isError: true,
        error: action.payload,
      },
    }),
    [actions.fetchChats.start]: (state) => ({
      ...state,
      fetchChats: {
        ...state.fetchChats,
        isLoading: true,
        isError: false,
        error: null,
      },
      createChat: {
        isLoading: false,
        isError: false,
        error: null,
      },
    }),
    [actions.fetchChats.success]: (state, action) => ({
      ...state,
      list: action.payload.result,
      fetchChats: {
        ...state.fetchChats,
        isLoading: false,
      },
    }),
    [actions.fetchChats.error]: (state, action) => ({
      ...state,
      fetchChats: {
        ...state.fetchChats,
        isLoading: false,
        isError: true,
        error: action.payload,
      },
    }),
  },
  initialState,
);
