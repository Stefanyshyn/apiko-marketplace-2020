import { handleActions, combineActions } from '@letapp/redux-actions';
import * as actions from './productsActions';

const initialState = {
  searchFields: {
    keywords: '',
    location: '',
    priceFrom: '',
    priceTo: '',
  },
  addProductsFields: {
    title: '',
    description: '',
    photos: [],
    location: '',
    price: '',
  },
  fetchAddProduct: {
    isLoading: false,
    isError: false,
    error: null,
  },
  fetchProduct: {
    product: null,
    isLoading: false,
    isError: false,
    error: null,
  },
  saveProduct: {
    isLoading: false,
  },
};

export default handleActions(
  {
    [combineActions(actions.save.start, actions.deleteSaved.start)]: (
      state,
    ) => ({
      ...state,
      saveProduct: {
        ...state.saveProduct,
        isLoading: true,
      },
    }),
    [combineActions(
      actions.save.success,
      actions.save.error,
      actions.deleteSaved.success,
      actions.deleteSaved.error,
    )]: (state) => ({
      ...state,
      saveProduct: {
        ...state.saveProduct,
        isLoading: false,
      },
    }),

    [actions.changeSearchField]: (state, action) => {
      const { name, value } = action.payload;
      return {
        ...state,
        searchFields: {
          ...state.searchFields,
          [name]: value,
        },
      };
    },
    [actions.changeAddProductField]: (state, action) => {
      const { name, value } = action.payload;
      return {
        ...state,
        addProductsFields: {
          ...state.addProductsFields,
          [name]: value,
        },
      };
    },
    [actions.resetAddProduct]: (state) => {
      return {
        ...state,
        addProductsFields: {
          ...initialState.addProductsFields,
        },
      };
    },
    [actions.add.start]: (state) => ({
      ...state,
      fetchAddProduct: {
        ...state.fetchAddProduct,
        isLoading: true,
        isError: false,
        error: null,
      },
    }),
    [actions.add.success]: (state) => ({
      ...state,
      fetchAddProduct: {
        ...state.fetchAddProduct,
        isLoading: false,
      },
    }),
    [actions.add.error]: (state, action) => ({
      ...state,
      fetchAddProduct: {
        ...state.fetchAddProduct,
        isLoading: false,
        isError: true,
        error: action.payload,
      },
    }),
    [actions.fetchProduct.start]: (state) => ({
      ...state,
      fetchProduct: {
        ...state.fetchProduct,
        isLoading: true,
        isError: false,
        error: null,
      },
    }),
    [actions.fetchProduct.success]: (state, action) => {
      return {
        ...state,
        fetchProduct: {
          ...state.fetchProduct,
          product: action.payload.result,
          isLoading: false,
        },
      };
    },
    [actions.fetchProduct.error]: (state, action) => ({
      ...state,
      fetchProduct: {
        ...state.fetchProduct,
        isLoading: false,
        isError: true,
        error: action.payload,
      },
    }),
  },
  initialState,
);
