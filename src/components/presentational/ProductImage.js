import React from 'react';
import './ProductImage.css'
import placeholderImage from '../../images/product-placeholder.jpg'
import counterpart from 'counterpart';

const ProductImage = ({price}) => {
  return (
    <div className="ProductImageContainer" data-content={counterpart('product.hoverImage')}>
      <img src={placeholderImage} alt="" className="ProductImage"/>
    </div>
  )
}


export default ProductImage;
