import { handleActions } from '@letapp/redux-actions';
import * as actions from './logoutActions';

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
};

export default handleActions(
  {
    [actions.logout.start]: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      };
    },
    [actions.logout.success]: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    [actions.logout.error]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    },
  },
  initialState,
);
