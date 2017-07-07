import React from 'react';
import Translate from 'react-translate-component'
import './ProductImage.css'
import placeholderImage from '../../images/product-placeholder.jpg'
import counterpart from 'counterpart';

const ProductImage = ({price}) => {
  return (
    <div className="ProductImageContainer" data-content={counterpart('product.hoverImage')}>
      <img src={placeholderImage} className="ProductImage"/>
    </div>
  )
}


export default ProductImage;
