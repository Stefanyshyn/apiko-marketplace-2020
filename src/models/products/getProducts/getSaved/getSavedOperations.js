import * as actions from './getSavedActions';
import API, { schemas } from '../../../../service/api';
import { normalize } from 'normalizr';

export function getSaved(body) {
  return async function getSavedThunk(dispatch) {
    try {
      dispatch(actions.getSaved.start());

      let result = await API.products.getSaved(body);

      let nornalizedData = normalize(
        result.data,
        schemas.ProductsList,
      );

      dispatch(actions.getSaved.success(nornalizedData));
    } catch (err) {
      dispatch(actions.getSaved.error({ message: err.message }));
    }
  };
}

export function resetSaved() {
  return actions.resetSaved();
}
