import * as actions from './registerActions';
import { ViewerOperations } from '../../viewer';
import API from '../../../service/api';

export function register(body) {
  return async (dispatch) => {
    try {
      dispatch(actions.register.start());

      let res = await API.auth.register(body);
      const { token, user } = res.data;

      API.auth.setToken(token);

      dispatch(actions.register.success(user));

      dispatch(ViewerOperations.fetchViewer());
    } catch (err) {
      dispatch(actions.register.error(err));
      throw new Error();
    }
  };
}

export { actions };
