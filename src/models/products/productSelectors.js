import { createSelector } from 'reselect';
const getProductEntities = (state) => state.entities.products;
const getUserEntities = (state) => state.entities.users;

const getSavedProductsIds = (state) =>
  state.products.fetchProductSetting.saved.items;
const getWantedProductsIds = (state) =>
  state.products.fetchProductSetting.wanted.items;
const getLatestProductsIds = (state) =>
  state.products.fetchProductSetting.latest.items;

export const getUserProducts = createSelector(
  (state, userId) => {
    const products = getProductEntities(state);
    userId = Number(userId);
    return Object.values(products).filter(
      (item) => item.ownerId === userId,
    );
  },
  (item) => item,
);

export const getWantedProducts = createSelector(
  [getProductEntities, getWantedProductsIds],
  (entities, ids) => ids.map((id) => entities[id]),
);

export const getLatestProducts = createSelector(
  [getProductEntities, getLatestProductsIds],
  (entities, ids) => ids.map((id) => entities[id]),
);

export const getSavedProducts = createSelector(
  [getProductEntities, getSavedProductsIds],
  (entities, ids) => ids.map((id) => entities[id]),
);

export const getProduct = createSelector(
  (state, id) => {
    const products = getProductEntities(state);
    return products[id];
  },
  (item) => item,
);

export const getProductOwner = createSelector(
  (state, id) => {
    const users = getUserEntities(state);
    const products = getProductEntities(state);
    const product = products[id];
    if (!product) return undefined;
    let ownerId = product.ownerId || product.owner;

    let user = users[ownerId];
    return user;
  },
  (item) => item,
);
