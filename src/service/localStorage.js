export const NAMES = {
  TOKEN: '__token__',
  PERSIST: '__persist__',
};

//***************** TOKEN ************************************/

export const getToken = () => {
  return JSON.parse(localStorage.getItem(NAMES.TOKEN));
};
export const removeToken = () => {
  return localStorage.removeItem(NAMES.TOKEN);
};
export const setToken = (data) => {
  let json = JSON.stringify(data);
  localStorage.setItem(NAMES.TOKEN, json);
};

//***************** PERSIST ************************************/

export const getPersist = () => {
  return JSON.parse(localStorage.getItem(NAMES.PERSIST));
};
export const removePersist = () => {
  return localStorage.removeItem(NAMES.PERSIST);
};
export const setPersist = (data) => {
  let json = JSON.stringify(data);
  localStorage.setItem(NAMES.PERSIST, json);
};

//***************** HINTS ************************************/

export const inputHints = {
  _hints: [],

  init(nameHistory) {
    this._getHints({ nameHistory });
  },

  getHints({ nameHistory }) {
    this.init(nameHistory);
    return this._hints;
  },

  setHints({ nameHistory, hint }) {
    this._setHints({ nameHistory, hint });
  },
  clearHints({ nameHistory }) {
    try {
      localStorage.setItem(nameHistory, []);
      this._hints = [];
    } catch (err) {
      this._hints = [];
    }
  },

  _setHints({ nameHistory, hint }) {
    try {
      this.init(nameHistory);
      this._hints.push(hint);
      let json = JSON.stringify(this._hints);
      localStorage.setItem(nameHistory, json);
    } catch (err) {}
  },

  _getHints({ nameHistory }) {
    try {
      let hints = JSON.parse(localStorage.getItem(nameHistory));
      this._hints = hints || [];
      return this._hints;
    } catch (err) {
      this._hints = [];
    }
  },
};
