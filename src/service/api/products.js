import axios from 'axios';

import { getToken } from '../localStorage';

const urls = {
  getLatest: '/api/products/latest',
  getSaved: '/api/products/saved',
  getProductsByFilter: '/api/products/search',
  add: '/api/products',
  getUserProducts: (id) => `/api/users/${id}/products`,
  save: (id) => `/api/products/${id}/saved`,
  deleteSaved: (id) => `/api/products/${id}/saved`,
  getProduct: (id) => `/api/products/${id}`,
};

const products = {
  init() {
    let token = getToken();
    this._setTokenToAxios(token);
  },

  async getLatest(limit, from) {
    this.init();
    let url = `${urls.getLatest}?limit=${limit}`;

    if (from) url += `&from=${from}`;

    return axios.get(url);
  },

  async getUserProducts(id) {
    products.init();
    return axios.get(urls.getUserProducts(id));
  },
  async getProductsByFilter(body) {
    products.init();
    return axios.get(
      urls.getProductsByFilter +
        '?' +
        Object.entries(body)
          .map(([key, value]) => key + '=' + value)
          .join('&'),
    );
  },
  async getSaved(body) {
    products.init();
    return axios.get(
      urls.getSaved +
        '?' +
        Object.entries(body)
          .map(([key, value]) => key + '=' + value)
          .join('&'),
    );
  },
  async save(id) {
    products.init();

    return axios.post(urls.save(id));
  },

  async deleteSaved(id) {
    products.init();
    return axios.delete(urls.deleteSaved(id));
  },

  async add(body) {
    products.init();

    return axios.post(urls.add, body);
  },

  async getProduct(id) {
    products.init();
    return axios.get(urls.getProduct(id));
  },

  _setTokenToAxios(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
};

export default products;
