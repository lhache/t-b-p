import React from 'react';
// import './Price.css'

const Price = ({price}) => {
  return (
    <div>
      <b>{(price/100).toFixed(2)} €</b>
    </div>
  )
}


export default Price;
