import axios from 'axios';

import {
  getToken,
  setToken as storeToken,
  removeToken,
} from '../localStorage';
import SocketApi from './SocketApi';

const urls = {
  register: '/api/auth/register',
  login: '/api/auth/login',
};

const auth = {
  _token: null,

  get isLoogedIn() {
    return !!this._token;
  },

  init() {
    try {
      this._token = getToken();

      this._setTokenToAxios(this._token);

      SocketApi.init(this._token);
    } catch (err) {
      alert(err);
    }
  },
  setToken(token) {
    try {
      storeToken(token);

      this._token = token;
      this._setTokenToAxios(token);
    } catch (err) {
      alert(err);
    }
  },

  async register(body) {
    return axios.post(urls.register, body);
  },

  async login(body) {
    return axios.post(urls.login, body);
  },

  logout() {
    this._token = '';
    try {
      removeToken();
    } catch (err) {
      alert(err);
    }
  },

  _setTokenToAxios(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
};

export default auth;
