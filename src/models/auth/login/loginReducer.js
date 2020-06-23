import { handleActions } from '@letapp/redux-actions';
import * as actions from './loginActions';

const initialState = {
  email: '',
  password: '',
  isLoading: false,
  isError: false,
  error: null,
};

export default handleActions(
  {
    [actions.changeEmail]: (state, action) => {
      return { ...state, email: action.payload, isError: false };
    },
    [actions.changePassword]: (state, action) => {
      return { ...state, password: action.payload, isError: false };
    },
    [actions.reset]: (state, action) => {
      return { ...state, ...initialState };
    },
    [actions.login.start]: (state, action) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    },
    [actions.login.success]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        email: '',
        password: '',
      };
    },
    [actions.login.error]: (state, action) => {
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
