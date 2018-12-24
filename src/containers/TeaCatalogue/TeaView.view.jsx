import React from 'react';

export default ({ currentTea }) => {
  if (!currentTea) return '... no tea';

  return (
    <div>
      <h2>
Do you want to purchase &quot;
        {currentTea.name}
&quot;
      </h2>
      <p>
Price:
        {currentTea.price}
      </p>
    </div>
  );
};
