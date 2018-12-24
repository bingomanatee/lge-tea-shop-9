/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { StoreContext } from '../StoreProvider';

import CartView from './Cart.view';

export default class Cart extends Component {
  static contextType = StoreContext;

  constructor(props) {
    super(props);
    this.state = { currentTea: null, visible: false };
  }

  componentDidMount() {
    this.store = this.context.store;
  }


  render() {
    const { state, store } = this.context;
    if (!store.initialized) return '...';
    eval('debugger');
    return <CartView cart={store.state.user.shoppingCart} />;
  }
}
