const localStorage = {
  setToStorage: (key, value) => {
    if (typeof window !== 'undefined') {
      return window.localStorage.setItem(key, JSON.stringify(value));
    }
  },
  getFromStorage: (key) => {
    if (typeof window !== 'undefined') {
      return JSON.parse(window.localStorage.getItem(key));
    }
  },
  deleteFromStorage: (key) => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  }
};

export default localStorage;
