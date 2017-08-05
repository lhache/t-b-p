import React from 'react';
import Translate from 'react-translate-component'
// import './Price.css'

const Price = ({price}) => {
  return (
    <div>
      <b>{(price/100).toFixed(2)} €</b>
    </div>
  )
}


export default Price;
