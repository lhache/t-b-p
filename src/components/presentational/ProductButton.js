import React from 'react'
import Translate from 'react-translate-component'
import './ProductButton.css'

const ProductButton = ({onClick, translationKey}) => {
  return (
    <button onClick={onClick} className="ProductButton">
      <Translate content={translationKey} />
    </button>
  )
}

export default ProductButton
