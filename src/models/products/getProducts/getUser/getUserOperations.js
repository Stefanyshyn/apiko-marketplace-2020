import * as actions from './getUserActions';
import API, { schemas } from '../../../../service/api';
import { normalize } from 'normalizr';

export function getUserProducts(id) {
  return async function getUserProductsThunk(dispatch) {
    try {
      dispatch(actions.getUserProducts.start());

      let result = await API.products.getUserProducts(id);

      let normalizedData = normalize(
        result.data.list,
        schemas.ProductsList,
      );

      dispatch(actions.getUserProducts.success(normalizedData));
    } catch (err) {
      dispatch(
        actions.getUserProducts.error({ message: err.message }),
      );
    }
  };
}

export function resetUserProducts() {
  return actions.resetUserProducts();
}
