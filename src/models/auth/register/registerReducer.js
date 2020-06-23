import { handleActions } from '@letapp/redux-actions';
import * as actions from './registerActions';

const initialState = {
  email: '',
  fullName: '',
  password: '',

  isLoading: false,
  isError: false,
  error: null,
};

export default handleActions(
  {
    [actions.changeEmail]: (state, action) => {
      return { ...state, email: action.payload };
    },
    [actions.changeFullName]: (state, action) => {
      return { ...state, fullName: action.payload };
    },
    [actions.changePassword]: (state, action) => {
      return { ...state, password: action.payload };
    },
    [actions.reset]: (state, action) => {
      return { ...state, email: '', fullName: '', password: '' };
    },
    [actions.register.start]: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      };
    },
    [actions.register.success]: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    [actions.register.error]: (state, action) => {
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
