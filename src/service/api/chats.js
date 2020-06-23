import axios from 'axios';

import { getToken } from '../localStorage';

const urls = {
  createChat: (productId) => `/api/products/${productId}/createChat`,
  getChats: `/api/chats`,
  messageChat: (productId) => `/api/chats/${productId}/messages`,
};

const products = {
  init() {
    let token = getToken();
    this._setTokenToAxios(token);
  },

  async createChat(productId, text) {
    this.init();
    return axios.post(urls.createChat(productId), { message: text });
  },

  async getChats() {
    this.init();
    return axios.get(urls.getChats);
  },

  _setTokenToAxios(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
};

export default products;
