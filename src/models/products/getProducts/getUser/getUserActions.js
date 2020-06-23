import {
  createAsyncActions,
  createAction,
} from '@letapp/redux-actions';

export const getUserProducts = createAsyncActions(
  'products/GET_USER_PRODUCTS',
);
export const resetUserProducts = createAction(
  'products/RESET_USER_PRODUCTS',
);
