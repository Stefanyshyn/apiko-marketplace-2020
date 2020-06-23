import axios from 'axios';

import { getToken } from '../localStorage';

const urls = {
  getMessages: (chatId) => `/api/chats/${chatId}/messages`,
  sendMessage: (chatId) => `/api/chats/${chatId}/messages`,
};

const products = {
  init() {
    let token = getToken();
    this._setTokenToAxios(token);
  },

  async getMessages({ chatId, limit, from }) {
    this.init();
    let url = urls.getMessages(chatId) + `?limit=${limit}`;
    if (from) url += `&from=${from}`;
    return axios.get(url);
  },

  async sendMessage(chatId, text) {
    this.init();
    return axios.post(urls.sendMessage(chatId), { message: text });
  },

  _setTokenToAxios(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
};

export default products;
