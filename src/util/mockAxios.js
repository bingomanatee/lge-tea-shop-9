/* eslint-disable default-case */
import { API_URL, teas } from './constants';

const userLogin = ({ userName, password }) => ({ name: userName });

const makeReceipt = (params) => {
  const { teaName, qty = 1 } = params;
  const tea = teas.filter(t => t.name === teaName)[0];
  if (!tea) {
    return Promise.reject(new Error(`cannot find tea ${teaName}`));
  }
  const { name, price } = tea;
  return {
    name,
    qty,
    cost: price * qty,
  };
};

export default {
  get: (url) => {
    const path = url.replace(API_URL, '');
    let out;

    switch (path) {
      case '/teas':
        out = Promise.resolve({ json: teas });
        break;
    }
    return out;
  },
  post: (url, params) => {
    const path = url.replace(API_URL, '');
    let out;

    switch (path) {
      case '/login':
        out = Promise.resolve({ json: userLogin(params) });
        break;

      case '/sales':

        out = Promise.resolve({ json: makeReceipt(params) });
        break;
    }

    return out;
  },
};
