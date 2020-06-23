import {
  createAsyncActions,
  createAction,
} from '@letapp/redux-actions';

export const getSaved = createAsyncActions('products/GET_SAVED');
export const resetSaved = createAction('products/RESET_SAVED');
