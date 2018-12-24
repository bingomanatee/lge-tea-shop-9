import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import './App.css';
import StoreProvider from './containers/StoreProvider';
import Main from './containers/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <StoreProvider>
          <Main />
        </StoreProvider>
      </div>
    );
  }
}

export default hot(module)(App);
