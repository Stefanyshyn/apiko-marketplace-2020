import { handleActions } from '@letapp/redux-actions';
import * as actions from './getSavedActions';

const initialState = {
  items: [],
  hasNextProduct: true,
  isLoading: false,
  isError: false,
};

export default handleActions(
  {
    [actions.getSaved.start]: (state) => ({
      ...state,
      isLoading: true,
      isError: false,
      error: null,
    }),
    [actions.getSaved.success]: (state, { payload: { result } }) => {
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
    [actions.getSaved.error]: (state, action) => ({
      ...state,
      isLoading: false,
      isError: true,
      error: action.payload,
    }),

    [actions.resetSaved]: (state) => {
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
