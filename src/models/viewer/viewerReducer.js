import { handleActions, combineActions } from '@letapp/redux-actions';
import * as actions from './viewerActions';

const initialState = {
  fetchViewer: {
    isLoading: false,
    isError: false,
    error: null,
  },
  user: null,
};

export default handleActions(
  {
    [combineActions(
      actions.fetchViewer.start,
      actions.saveViewer.start,
    )]: (state) => ({
      ...state,
      fetchViewer: {
        ...state.fetchViewer,
        isLoading: true,
        isError: false,
        error: null,
      },
    }),
    [combineActions(
      actions.fetchViewer.success,
      actions.saveViewer.success,
    )]: (state, action) => ({
      ...state,
      fetchViewer: {
        ...state.fetchViewer,
        isLoading: false,
      },
      user: action.payload?.result,
    }),
    [combineActions(
      actions.fetchViewer.error,
      actions.saveViewer.error,
    )]: (state, action) => ({
      ...state,
      fetchViewer: {
        ...state.fetchViewer,
        isLoading: false,
        isError: true,
        error: action.payload,
      },
    }),
  },
  initialState,
);
