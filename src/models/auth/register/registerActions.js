import {
  createAction,
  createAsyncActions,
} from '@letapp/redux-actions';

export const changeEmail = createAction('auth/register/CHANGE_EMAIL');
export const changeFullName = createAction(
  'auth/register/CHANGE_FULLNAME',
);
export const changePassword = createAction(
  'auth/register/CHANGE_PASSWORD',
);
export const reset = createAction('auth/register/RESET');

export const register = createAsyncActions('auth/register/REGISTER');
