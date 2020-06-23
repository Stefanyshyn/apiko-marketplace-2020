import { handleActions } from '@letapp/redux-actions';
import * as actions from './getWantedActions';

const initialState = {
  items: [],
  hasNextProduct: true,
  isLoading: false,
  isError: false,
};

export default handleActions(
  {
    [actions.getByFilter.start]: (state) => ({
      ...state,
      isLoading: true,
      isError: false,
      error: null,
    }),
    [actions.getByFilter.success]: (
      state,
      { payload: { result } },
    ) => {
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
    [actions.getByFilter.error]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      error: action.payload,
    }),

    [actions.resetWanted]: (state) => {
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
