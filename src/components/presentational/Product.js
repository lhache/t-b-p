import React from 'react'
import Flexbox from 'flexbox-react';
import Truncate from 'react-truncate';
import Price from './Price'
import Ratings from './Ratings'
import ProductButton from './ProductButton'
import ProductImage from './ProductImage'
import './Product.css'

const Product = ({product}) => {
  return (
    <Flexbox flexBasis="100%" justifyContent="center" className="Product">
      <Flexbox flexBasis="90%" flexWrap="wrap" >
        <Flexbox flexBasis="100%" justifyContent="center">
          <Flexbox flexBasis="90%" justifyContent="center">
            <ProductImage />
          </Flexbox>
        </Flexbox>
        <Flexbox flexBasis="100%" className="ProductName">
          <Truncate lines={2}>
            {product.name}
          </Truncate>
        </Flexbox>
        <Flexbox flexBasis="50%" justifyContent="flex-start">
            <Price price={product.price} />
        </Flexbox>
        <Flexbox flexBasis="50%" justifyContent="flex-end">
            <Ratings ratings={product.ratings} />
        </Flexbox>
        <Flexbox flexBasis="90%" justifyContent="center">
          <ProductButton link={`/details/${product.id}`} />
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
}

export default Product
