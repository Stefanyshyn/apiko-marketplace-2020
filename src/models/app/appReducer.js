import { handleActions } from '@letapp/redux-actions';
import * as actions from './appActions';

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
};

export default handleActions(
  {
    [actions.initialization.start]: (state) => ({
      ...state,
      isLoading: true,
      isError: false,
      error: null,
    }),
    [actions.initialization.success]: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    [actions.initialization.error]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      error: action.payload,
    }),
  },
  initialState,
);
