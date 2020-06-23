import * as actions from './viewerActions';
import API, { schemas } from '../../service/api';
import { removeToken } from '../../service/localStorage';
import { normalize } from 'normalizr';

export function fetchViewer() {
  return async function fetchViewerThunk(dispatch) {
    try {
      dispatch(actions.fetchViewer.start());

      const result = await API.user.get();

      const normalizedData = normalize(result.data, schemas.User);

      dispatch(actions.fetchViewer.success(normalizedData));
    } catch (err) {
      removeToken();
      dispatch(actions.fetchViewer.error({ message: err.message }));
    }
  };
}

export function putViewer(body) {
  return async function putViewerThunk(dispatch) {
    try {
      dispatch(actions.fetchViewer.start());
      const { avatar } = body;

      let newAvatar = avatar;

      if (typeof avatar === 'object') {
        let result = await API.upload.image(avatar);
        newAvatar = result.data;
      }

      const res = await API.user.put({
        ...body,
        avatar: newAvatar,
      });

      const normalizedData = normalize(res.data, schemas.User);

      dispatch(actions.fetchViewer.success(normalizedData));
    } catch (err) {
      dispatch(actions.fetchViewer.error({ message: err.message }));
    }
  };
}
