import * as actions from './productsActions';
import API, { schemas } from '../../service/api';
import { normalize } from 'normalizr';

export function save(idProduct) {
  return async function saveThunk(dispatch) {
    try {
      dispatch(actions.save.start());

      await API.products.save(idProduct);

      dispatch(actions.save.success(idProduct));
    } catch (err) {
      dispatch(actions.save.error({ message: err.message }));
    }
  };
}

export function deleteSaved(idProduct) {
  return async function deleteSavedThunk(dispatch) {
    try {
      dispatch(actions.deleteSaved.start());

      await API.products.deleteSaved(idProduct);

      dispatch(actions.save.success(idProduct));
    } catch (err) {
      dispatch(actions.deleteSaved.error({ message: err.message }));
    }
  };
}

export function changeSearchField(name, value) {
  return actions.changeSearchField({ name, value });
}

export function changeAddProductField(name, value) {
  return actions.changeAddProductField({ name, value });
}

export function resetAddProduct() {
  return actions.resetAddProduct();
}

export function add(body) {
  return async function addThunk(dispatch) {
    try {
      dispatch(actions.add.start());

      let photos = body.photos;
      let newPhotos = [];

      for (let photo of photos) {
        let result = await API.upload.image(photo);
        newPhotos.push(result.data);
      }
      body.photos = newPhotos;

      let result = await API.products.add(body);

      let normalizedData = normalize(result.data, schemas.Product);

      dispatch(actions.add.success(normalizedData));

      dispatch(actions.resetAddProduct());
    } catch (err) {
      dispatch(actions.add.error({ message: err.message }));
      throw err;
    }
  };
}

export function fetchProduct(id) {
  return async function fetchProductThunk(dispatch) {
    try {
      dispatch(actions.fetchProduct.start());

      let result = await API.products.getProduct(id);

      let normalizedData = normalize(result.data, schemas.Product);

      dispatch(actions.fetchProduct.success(normalizedData));
    } catch (err) {
      dispatch(actions.fetchProduct.error({ message: err.message }));
    }
  };
}
