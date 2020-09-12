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

  async getLatest({ from, limit }) {
    this.init();
    let url = `${urls.getLatest}?limit=${limit}`;

    if (from) url += `&from=${from}`;

    return axios.get(url);
  },

  async getUserProducts(id) {
    this.init();
    return axios.get(urls.getUserProducts(id));
  },
  async getProductsByFilter(body) {
    this.init();
    return axios.get(
      urls.getProductsByFilter +
        '?' +
        Object.entries(body)
          .map(([key, value]) => key + '=' + value)
          .join('&'),
    );
  },
  async getSaved(body) {
    this.init();
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
    this.init();
    return axios.delete(urls.deleteSaved(id));
  },

  async add(body) {
    this.init();

    return axios.post(urls.add, body);
  },

  async getProduct(id) {
    this.init();
    return axios.get(urls.getProduct(id));
  },

  _setTokenToAxios(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
};

export default products;
