import React from 'react';
import Translate from 'react-translate-component'
// import './Price.css'

const Price = ({price}) => {
  return (
    <div>
      {(price/100).toFixed(2)}
    </div>
  )
}


export default Price;
