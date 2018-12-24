/* eslint-disable no-shadow */
import axios from './mockAxios';
import { API_URL } from './constants';

export default (actions, userName, password) => (
  // note: some obfuscation of password better in a real app
  axios.post(`${API_URL}/login`, { userName, password })
    .then(data => (data.json())
      .then(user => (state => (({ ...state, loggedInUserName: user.name, loggedIn: true }))
        .catch(err => (state => (({ ...state, loginResult: err, loggedIn: false }))
        ))
      )))
);
