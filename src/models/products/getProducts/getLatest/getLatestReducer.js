import { handleActions } from '@letapp/redux-actions';
import * as actions from './getLatestActions';

const initialState = {
  items: [],
  hasNextProduct: true,
  isLoading: false,
  isError: false,
};

export default handleActions(
  {
    [actions.getLatest.start]: (state) => ({
      ...state,
      isLoading: true,
      isError: false,
      error: null,
    }),
    [actions.getLatest.success]: (state, { payload: { result } }) => {
      return {
        ...state,
        items:
          state.items.length === 0
            ? [...result]
            : [...state.items, ...result],
        hasNextProduct: result.length !== 0,
        isLoading: false,
      };
    },
    [actions.getLatest.error]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      error: action.payload,
    }),

    [actions.resetLatest]: (state) => {
      return {
        ...state,
        items: [],
        isLoading: false,
        isError: false,
        error: null,
      };
    },
  },
  initialState,
);
