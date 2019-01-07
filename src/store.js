/* eslint-disable no-shadow */
import { Store, StoreMap } from '@wonderlandlabs/looking-glass-engine';
import axios from './util/mockAxios';
import { API_URL } from './util/constants';
import logIn from './util/logIn';

const userEngine = new Store({
  id: 'userEngine',
  debug: true,
  state: {
    userID: 0,
    loggedIn: false,
    loginResult: null,
    userName: null,
  },
  actions: {
    logOut: () => ({
      userID: 0,
      loggedIn: false,
      loginResult: null,
      loggedInUserName: null,
    }),
    logIn: ({ actions }, userName, password) => (
      // note: some obfuscation of password better in a real app
      axios.post(`${API_URL}/login`, {
        userName,
        password,
      })
        .then(data => (data.json)
          .then(user => (({ state }) => (({
            ...state,
            loggedInUserName: user.name,
            loggedIn: true,
          }))
            .catch(err => (({ state }) => (({
              ...state,
              loginResult: err,
              loggedIn: false,
            }))
            ))
          )))
    ),
  },
});

const cartEngine = new Store({
  state: {
    items: [],
  },
  actions: {
    addToCart: ({ actions, state }, item, qty) => {
      const items = state.items;
      return {
        ...state,
        items: [...items, {
          item,
          qty,
        }],
      };
    },
  },
});

const teaEngine = new Store({
  id: 'teaEngine',
  debug: true,
  state: {
    teas: [],
    receipts: [],
    customerVisits: 0,
  },
  starter: () => axios.get(`${API_URL}/teas`)
    .then(result => result.json)
    .then(teas => ({ state }) => {
      console.log('=========== teas:', teas, 'state:', state);
      return ({
        ...state,
        teas: [...state.teas, ...teas].filter(t => t),
      });
    })
    .catch((err) => {
      console.log('get teas error:', err);
    }),
  actions: {
    reset: () => ({
      teas: [],
      customerVisits: 0,
      receipts: [],
    }),
    incCustomerVisits: ({ state }) => {
      const customerVisits = state.customerVisits + 1;
      return {
        ...state,
        customerVisits,
      };
    },
    sellTea: ({ actions, state }, id, qty = 1, userName) => {
      const tea = state.teas.filter(t => t.id === id);
      if (!tea) return state;
      const saleValue = tea.price * qty;
      const receipt = {
        tea,
        qty,
        saleValue,
        userName,
      };
      const receipts = [...state.receipts, receipt];
      return {
        ...state,
        receipts,
      };
    },
    addReceipt: ({ actions, state }, receipt, userName) => {
      const newReceipt = {
        ...receipt,
        userName,
      };
      const receipts = [...state.receipts, newReceipt];
      return {
        ...state,
        receipts,
      };
    },
    postTeaSale: ({ actions }, userName, teaName, qty = 1) => axios.post(`${API_URL}/sales`, {
      teaName,
      qty,
    })
      .then(r => r.data)
      .then(({ receipt }) => actions.addReceipt(receipt, userName)),
  },
});

teaEngine.debugStream.subscribe((message) => {
  console.log('te debug: ', message);
}, (err) => {
  console.log('te debug error: ', err);
});

const baseStore = new StoreMap({
  user: userEngine,
  teaShop: teaEngine,
  cart: cartEngine,
}, { debug: true });

baseStore.debugStream.subscribe((message) => {
  console.log('baseStore debug: ', message);
}, (err) => {
  console.log('baseStore debug error: ', err);
});
baseStore.start();
export default baseStore;
