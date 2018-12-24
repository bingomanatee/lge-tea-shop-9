import React from 'react';
import { Layout } from 'antd';
import TeaCatalogue from '../TeaCatalogue';
import Cart from '../Cart';

const {
  Header, Sider, Footer, Content,
} = Layout;
export default () => (
  <Layout style={({ height: '100%', width: '100%' })}>
    <Header>Header</Header>
    <Layout>
      <Content><TeaCatalogue /></Content>
      <Sider><Cart /></Sider>
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
);
