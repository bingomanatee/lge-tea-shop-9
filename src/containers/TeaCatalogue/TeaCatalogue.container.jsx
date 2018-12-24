/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Modal } from 'antd';
import TeaCatalogueView from './TeaCatalogue.view';
import TeaView from './TeaView.view';
import { StoreContext } from '../StoreProvider';

const forCatalogue = tea => ({ ...tea, title: `${tea.name}(id ${tea.id})`, description: tea.price });

export default class TeaCatalogue extends Component {
  static contextType = StoreContext;

  constructor(props) {
    super(props);
    this.state = { currentTea: null, visible: false };
  }

  buyTea(id) {
    this.setState({ id, currentTea: this.currentTea(id), visible: true });
  }

  get ok() {
    return () => {
      if (this.store) {
        this.store.actions.addToCart(this.currentTea())
          .catch(err => console.log('error in addToCart:', err));
      }
      return this.setState({ visible: false });
    };
  }

  get cancel() {
    return () => {
      console.log('cancelling');
      this.setState({ visible: false });
    };
  }

  componentDidMount() {
    this.store = this.context.store;
  }

  currentTea(id) {
    if (!id) id = this.state.id;
    if (!this.store.state) return {};
    return this.store.state.teaShop.teas.filter(tea => tea.id === id)[0];
  }

  render() {
    const { state, store } = this.context;
    if (!store.isInitialized) {
      return <TeaCatalogueView teas={[]} />;
    }
    let currentTea;
    if (this.state.id) {
      currentTea = this.currentTea(this.state.id);
    }
    console.log('rendering', this.state);
    return (
      <React.Fragment>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.ok}
          onCancel={this.cancel}
        >
          <TeaView currentTea={currentTea} />
        </Modal>
        <TeaCatalogueView
          teas={state.teaShop.teas.map(forCatalogue)}
          buyTea={id => this.buyTea(id)}
        />
      </React.Fragment>
    );
  }
}
