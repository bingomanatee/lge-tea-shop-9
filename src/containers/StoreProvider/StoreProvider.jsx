/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import store from '../../store';

export const StoreContext = React.createContext(store.state);

export default class App extends PureComponent {
  static contextType = StoreContext;

  constructor(props) {
    super(props);
    // storing both the store and its resulting state in component state
    this.state = {
      state: store.state,
      store,
    };
  }

  componentDidMount() {
    this.state.store.stream.subscribe(({state}) => {
      console.log('store state: ', state);
      this.setState({ state: { ...state } });
    });
  }

  render() {
    return (
      <StoreContext.Provider value={({ ...this.state })}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
