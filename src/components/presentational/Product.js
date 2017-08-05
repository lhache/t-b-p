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
      <Flexbox flexBasis="100%" flexWrap="wrap" >
          <Flexbox flexBasis="100%" justifyContent="center">
            <ProductImage />
          </Flexbox>
        <Flexbox flexBasis="100%" className="ProductName" marginTop="10px">
          <Truncate lines={2}>
            {product.name}
          </Truncate>
        </Flexbox>
        <Flexbox flexBasis="50%" justifyContent="flex-start" marginTop="5px">
            <Price price={product.price} />
        </Flexbox>
        <Flexbox flexBasis="50%" justifyContent="flex-end" marginTop="5px">
            <Ratings ratings={product.ratings} />
        </Flexbox>
        <Flexbox flexBasis="90%" justifyContent="center" marginTop="5px">
          <ProductButton link={`/details/${product.id}`} />
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
}

export default Product
