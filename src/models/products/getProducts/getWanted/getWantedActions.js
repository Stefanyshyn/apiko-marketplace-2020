import {
  createAsyncActions,
  createAction,
} from '@letapp/redux-actions';

export const getByFilter = createAsyncActions(
  'products/GET_BY_FILTER',
);
export const resetWanted = createAction('products/RESET_WANTED');
