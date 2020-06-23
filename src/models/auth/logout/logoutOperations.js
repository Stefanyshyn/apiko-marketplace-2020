import * as actions from './logoutActions';
import { ViewerActions } from '../../viewer';

import { removeToken } from '../../../service/localStorage';

export function logout() {
  return async (dispatch) => {
    try {
      dispatch(actions.logout.start());
      removeToken();
      dispatch(actions.logout.success());

      dispatch(ViewerActions.fetchViewer.success(null));
    } catch (err) {
      dispatch(actions.logout.error(err));
    }
  };
}

export { actions };
