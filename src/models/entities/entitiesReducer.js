import { handleActions } from '@letapp/redux-actions';
import { MessagesActions } from '../messages';
import combineActions from '@letapp/redux-actions/lib/combineActions';
import { ProductsActions } from '../products';
const initialState = {
  products: {
    // [id]: {
    //     product
    // }
  },
  users: {
    // [id]: {
    //     user
    // }
  },
  messages: {
    // [id]: {
    //     product
    // }
  },
  viewer: {},
  chats: {
    // [id]: {
    //     user
    // }
  },
};

const reducer = handleActions(
  {
    [combineActions(
      MessagesActions.sendMessage.start,
      MessagesActions.sendMessage.success,
    )]: (state, { payload: { result, chatId } }) => {
      return {
        ...state,
        chats: {
          ...state.chats,
          [chatId]: {
            ...state.chats[chatId],
            message: state.messages[result],
          },
        },
      };
    },
    [combineActions(
      ProductsActions.save.success,
      ProductsActions.deleteSaved.success,
    )]: (state, action) => {
      let idProduct = action.payload;
      let newProduct = state.products[idProduct];
      newProduct.saved = !newProduct.saved;
      state.products[idProduct] = { ...newProduct };
      return {
        ...state,
        products: {
          ...state.products,
          [idProduct]: {
            ...newProduct,
          },
        },
      };
    },
  },
  initialState,
);

export default function entitiesReducer(
  state = initialState,
  action,
) {
  let stateWithEntities = state;
  if (action.payload && action.payload.entities) {
    stateWithEntities = Object.keys(action.payload.entities).reduce(
      (accState, key) => {
        const entity = accState[key];

        accState[key] = Object.assign(
          {},
          entity,
          action.payload.entities[key],
        );

        return accState;
      },
      { ...state },
    );
  }
  return reducer(stateWithEntities, action);
}
