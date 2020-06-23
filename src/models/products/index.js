import * as ProductsActions from './productsActions';
import * as ProductsOperations from './productsOperations';
import * as ProductSelectors from './productSelectors';

import reducer from './productsReducer';
import { combineReducers } from 'redux';
import getProductsReducer from './getProducts/getProductsReducer';

export { ProductsActions, ProductsOperations, ProductSelectors };

export default combineReducers({
  addSaveFetchProduct: reducer,
  fetchProductSetting: getProductsReducer,
});
