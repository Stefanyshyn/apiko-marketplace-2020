import * as actions from './usersActions';
import API, { schemas } from '../../service/api';
import { normalize } from 'normalizr';

export function fetchUser(userId) {
  return async function fetchUserThunk(dispatch) {
    try {
      dispatch(actions.fetchUser.start());

      const result = await API.user.getUser(userId);

      const normalizedData = normalize(result.data, schemas.User);

      dispatch(actions.fetchUser.success(normalizedData));
    } catch (err) {
      dispatch(actions.fetchUser.error({ message: err.message }));
    }
  };
}
