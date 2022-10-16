import React from 'react';
import Options from './Options';

const OrderEntry = () => {
  return (
    <div>
      <Options opyionsType="scoops" />
      <Options opyionsType="toppings" />
    </div>
  );
};

export default OrderEntry;
