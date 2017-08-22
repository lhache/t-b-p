import React from 'react'
import Translate from 'react-translate-component'
import { Link } from 'react-router-dom'
import './ProductButton.css'

const ProductButton = ({link, translationKey}) => {
  debugger;
  return (
    <button className="ProductButton">
      <Link to={link} className="ProductButtonLink">
        <Translate content={translationKey} />
      </Link>
    </button>
  )
}

export default ProductButton
