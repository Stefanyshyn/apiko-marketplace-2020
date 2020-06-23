import { createAsyncActions } from '@letapp/redux-actions';

export const fetchMessages = createAsyncActions(
  'messages/FETCH_MESSAGE',
);

export const sendMessage = createAsyncActions(
  'messages/SEND_MESSAGE',
);
