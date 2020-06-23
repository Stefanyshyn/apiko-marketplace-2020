import {
  createAction,
  createAsyncActions,
} from '@letapp/redux-actions';

export const changeEmail = createAction('auth/login/CHANGE_EMAIL');
export const changePassword = createAction(
  'auth/login/CHANGE_PASSWORD',
);
export const reset = createAction('auth/login/RESET');

export const login = createAsyncActions('auth/login/LOGIN');
