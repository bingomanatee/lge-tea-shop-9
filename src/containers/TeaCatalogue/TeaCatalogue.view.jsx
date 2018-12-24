import React from 'react';

import { List } from 'antd';

export default ({ teas, buyTea }) => (
  <List>
    {teas.map(({ id, title, description }) => (
      <List.Item key={id}>
        <List.Item.Meta title={title} description={description} onClick={() => buyTea(id)} />
      </List.Item>
    ))}
  </List>
);
