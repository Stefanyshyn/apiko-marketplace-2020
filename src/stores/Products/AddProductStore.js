import { types as t } from 'mobx-state-tree';
import api from '../../service/api';
import { asyncModel } from '../utils';
import { ProductSchema } from '../schemas';
import { useStore } from '../createStore';

export function useAddProductStore() {
  return useStore((store) => store.products.addProduct);
}

export const AddProductStore = t
  .model('AddProductStore', {
    title: t.maybeNull(t.string),
    location: t.maybeNull(t.string),
    description: t.maybeNull(t.string),
    price: t.maybeNull(t.number),

    addProduct: asyncModel(addProduct),
  })
  .volatile(() => ({
    photos: [],
  }))
  .actions((store) => ({
    setTitle(value) {
      store.title = value;
    },
    setLocation(value) {
      store.location = value;
    },
    setDescription(value) {
      store.description = value;
    },
    setPrice(value) {
      store.price = value;
    },
    setPhotos(value) {
      store.photos = value;
    },
    deletePhotoByIndex(index) {
      store.photos = store.photos.filter((photo, i) => i !== index);
    },
    reset() {
      store.title = null;
      store.location = null;
      store.description = null;
      store.price = null;
      store.photos = [];
    },
  }));

function addProduct() {
  return async function addProductFlow(flow, store) {
    let newPhotos = [];

    for (let photo of store.photos) {
      let result = await api.upload.image(photo);
      newPhotos.push(result.data);
    }

    const { data } = await api.products.createProduct(
      store.title,
      store.location,
      store.description,
      newPhotos,
      store.price,
    );
    flow.merge(data, ProductSchema);
    store.reset();
  };
}
