import {
  createAsyncActions,
  createAction,
} from '@letapp/redux-actions';

export const save = createAsyncActions('products/SAVE');
export const deleteSaved = createAsyncActions(
  'products/DELETE_SAVED',
);
export const changeSearchField = createAction(
  'products/CHANGE_SEARCH_FIELD',
);
export const changeAddProductField = createAction(
  'products/CHANGE_ADD_PRODUCT_FIELD',
);
export const resetAddProduct = createAction(
  'products/RESET_ADD_PRODUCT',
);

export const add = createAsyncActions('products/ADD_PDODUCT');

export const fetchProduct = createAsyncActions(
  'products/FETCH_PDODUCT',
);
