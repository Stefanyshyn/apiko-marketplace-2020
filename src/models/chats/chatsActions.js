import { createAsyncActions } from '@letapp/redux-actions';

export const createChat = createAsyncActions('chat/CREATE_CHAT');

export const fetchChats = createAsyncActions('chats/FETCH_CHATS');
