import {
  createAsyncActions,
  createAction,
} from '@letapp/redux-actions';

export const getLatest = createAsyncActions('products/GET_LATEST');
export const resetLatest = createAction('products/RESET_LATEST');
