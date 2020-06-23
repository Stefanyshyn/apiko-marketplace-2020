import * as actions from './getWantedActions';
import API, { schemas } from '../../../../service/api';
import { normalize } from 'normalizr';

export function getByFilter(body) {
  return async function getByFilterThunk(dispatch) {
    try {
      dispatch(actions.getByFilter.start());

      let result = await API.products.getProductsByFilter(body);

      let normalizedData = normalize(
        result.data,
        schemas.ProductsList,
      );

      dispatch(actions.getByFilter.success(normalizedData));
    } catch (err) {
      dispatch(actions.getByFilter.error({ message: err.message }));
    }
  };
}

export function resetWanted() {
  return actions.resetWanted();
}
