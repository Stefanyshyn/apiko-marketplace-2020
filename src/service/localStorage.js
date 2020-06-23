export const NAME = {
  TOKEN: '__token__',
};
export const getToken = () => {
  return JSON.parse(localStorage.getItem(NAME.TOKEN));
};
export const removeToken = () => {
  return localStorage.removeItem(NAME.TOKEN);
};
export const setToken = (data) => {
  let json = JSON.stringify(data);
  localStorage.setItem(NAME.TOKEN, json);
};

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
