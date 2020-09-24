import axios from 'axios';

import { getToken } from '../localStorage';
const urls = {
  getUserById: (userId) => `/api/users/${userId}`,
  getCurrentUser: '/api/account',
  putUser: '/api/account',
};

const user = {
  _setToken() {
    const token = getToken();

    if (!!token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  },

  getCurrentUser() {
    if (!getToken) return undefined;
    this._setToken();
    return axios.get(urls.getCurrentUser);
  },
  getUser: (userId) => {
    return axios.get(urls.getUserById(userId));
  },
  changeCurrentUser(avatar, fullName, phone, location) {
    this._setToken();
    return axios.put(urls.putUser, {
      avatar,
      fullName,
      phone,
      location,
    });
  },
};

export default user;
