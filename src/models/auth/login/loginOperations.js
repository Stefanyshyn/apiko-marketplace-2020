import * as actions from './loginActions';
import { ViewerOperations } from '../../viewer';
import API from '../../../service/api';

export function login(body) {
  return async (dispatch) => {
    try {
      dispatch(actions.login.start());

      let res = await API.auth.login(body);
      const { token } = res.data;

      API.auth.setToken(token);
      dispatch(actions.login.success());

      dispatch(ViewerOperations.fetchViewer());
    } catch (err) {
      dispatch(actions.login.error(err));
      throw new Error();
    }
  };
}

export { actions };
