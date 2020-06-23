import * as actions from './getLatestActions';
import API, { schemas } from '../../../../service/api';
import { normalize } from 'normalizr';

export function getLatest(body) {
  return async function getLatestThunk(dispatch) {
    try {
      dispatch(actions.getLatest.start());

      let res = await API.products.getLatest(body);

      const { result, entities } = normalize(
        res.data,
        schemas.ProductsList,
      );

      dispatch(
        actions.getLatest.success({
          result,
          entities,
        }),
      );
    } catch (err) {
      dispatch(actions.getLatest.error({ message: err.message }));
    }
  };
}

export function resetLatest() {
  return actions.resetLatest();
}
