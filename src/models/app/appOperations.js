import * as actions from './appActions';
import API from '../../service/api';

import { ViewerOperations } from '../viewer';
import { MessagesOperations } from '../messages';
import SocketApi from '../../service/api/SocketApi';

export function subscribeToSockets() {
  return function subscribeToSocketsThunk(dispatch) {
    SocketApi.handleMessages((message) =>
      dispatch(MessagesOperations.handleMessageRealtime(message)),
    );
  };
}
export function init() {
  return async function initThunk(dispatch) {
    try {
      dispatch(actions.initialization.start());

      API.init();
      await dispatch(ViewerOperations.fetchViewer());

      dispatch(actions.initialization.success());

      dispatch(subscribeToSockets());
    } catch (err) {
      dispatch(
        actions.initialization.error({ message: err.message }),
      );
    }
  };
}
