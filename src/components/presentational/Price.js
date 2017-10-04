import React from 'react';
import './Price.css'

const Price = ({price}) => {
  return (
    <div className="Price">
      {/* <b>{(price/100).toFixed(2)} €</b> */}
      <b>{price}</b>
    </div>
  )
}


export default Price;
