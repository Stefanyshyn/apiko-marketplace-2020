import axios from 'axios';

import { getToken } from '../localStorage';
const urls = {
  getUserById: (userId) => `/api/users/${userId}`,
  getUser: '/api/account',
  putUser: '/api/account',
};

const user = {
  get: () => {
    const token = getToken();

    if (!!token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      return axios.get(urls.getUser);
    }
  },
  getUser: (userId) => {
    return axios.get(urls.getUserById(userId));
  },
  put: (body) => {
    const token = getToken();

    if (!!token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      return axios.put(urls.putUser, body);
    }
  },
};

export default user;
