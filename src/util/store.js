/* eslint-disable no-shadow */
import { Engine, EngineMerger } from '@wonderlandlabs/looking-glass-engine';
import axios from './mockAxios';
import { API_URL } from './constants';
import logIn from './logIn';

const userEngine = new Engine({
  id: 'userEngine',
  debug: true,
  state: {
    userID: 0,
    loggedIn: false,
    loginResult: null,
    userName: null,
    shoppingCart: [],
  },
}, {
  logOut: () => ({
    userID: 0,
    loggedIn: false,
    loginResult: null,
    loggedInUserName: null,
    shoppingCart: [],
  }),
  logIn: (actions, userName, password) => (
    // note: some obfuscation of password better in a real app
    axios.post(`${API_URL}/login`, { userName, password })
      .then(data => (data.json)
        .then(user => (state => (({ ...state, loggedInUserName: user.name, loggedIn: true }))
          .catch(err => (state => (({ ...state, loginResult: err, loggedIn: false }))
          ))
        )))
  ),
  addToCart: (actions, item, qty = 1) => (store) => {
    const id = store.shoppingCart.reduce((id, item) => {
      if (item.id >= id) return item.id + 1;
      return id;
    }, 1);
    const shoppingCart = [...store.shoppingCart, { id, item, qty }];
    return { ...store, shoppingCart };
  },
});

const teaEngine = new Engine({
  id: 'teaEngine',
  debug: true,
  state: {
    teas: [],
    receipts: [],
    customerVisits: 0,
  },
  initializer: () => axios.get(`${API_URL}/teas`)
    .then(result => result.json)
    .then(teas => (store) => {
      console.log('=========== teas:', teas, 'store:', store);
      return ({
        ...store,
        teas: [...store.teas, ...teas].filter(t => t),
      });
    })
    .catch((err) => {
      console.log('get teas error:', err);
    }),
}, {
  reset: () => ({ teas: [], customerVisits: 0, receipts: [] }),
  incCustomerVisits: () => (state) => {
    const customerVisits = state.customerVisits + 1;
    return { ...state, customerVisits };
  },
  addToCart: (actions, name, qty) => {
    actions.user.addToCart({ name, qty });
    // returns nothing.
  },
  sellTea: (actions, id, qty = 1, userName) => (state) => {
    const tea = state.teas.filter(t => t.id === id);
    if (!tea) return state;
    const saleValue = tea.price * qty;
    const receipt = {
      tea, qty, saleValue, userName,
    };
    const receipts = [...state.receipts, receipt];
    return Object.assign({}, state, { receipts });
  },
  addReceipt: (actions, receipt, userName) => (state) => {
    const newReceipt = { ...receipt, userName };
    const receipts = [...state.receipts, newReceipt];
    return Object.assign({}, state, { receipts });
  },
  postTeaSale: (actions, userName, teaName, qty = 1) => axios.post(`${API_URL}/sales`, { teaName, qty })
    .then(r => r.data)
    .then(({ receipt }) => actions.addReceipt(receipt, userName)),
});

const baseStore = new EngineMerger({ engines: { user: userEngine, teaShop: teaEngine }, debug: true });

export default baseStore;
