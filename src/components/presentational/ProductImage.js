import React from 'react';
import './ProductImage.css'
import placeholderImage from '../../images/product-placeholder.jpg'
import _get from 'lodash/get'
import _first from 'lodash/first'
import counterpart from 'counterpart'
import Flexbox from 'flexbox-react'

const ProductImage = ({images, size, hover, link}) => {

  const imageUrl = images ? _first(_get(images, size)) : placeholderImage
  const withHover = hover && 'ProductImageContainer-HoverCover';

  return (
    <Flexbox>
      <div
        className={`ProductImageContainer ${withHover}`}
        data-content={counterpart('product.hoverImage')}>
          <div className="ProductImage-AlignWrapper">
            <img src={imageUrl} alt="" className="ProductImage"/>
          </div>
      </div>
    </Flexbox>
  )
}


export default ProductImage;
