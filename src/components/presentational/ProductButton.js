import React from 'react'
import Translate from 'react-translate-component'
import { Link } from 'react-router-dom'
import './ProductButton.css'

const ProductButton = ({link, translationKey}) => {
  return (
    <Link to={link} className="ProductButtonLink">
      <button className="ProductButton">
        <Translate content={translationKey} />
      </button>
    </Link>
  )
}

export default ProductButton
