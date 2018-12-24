import React from 'react';

import { List } from 'antd';

export default ({ cart }) => {
  if (!(cart && cart.length)) {
    return <div>Cart is empty</div>;
  }

  return (
    <List>
      {cart.map(({ id, item, qty = 1 }) => (
        <List.Item key={id}>
          <List.Item.Meta title={item.name} description={`quantity: ${qty}`} />
        </List.Item>
      ))}
    </List>
  );
};
