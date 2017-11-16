import React from 'react'
import { getShortenedLocale } from '../../data/translations/translations'
import Flexbox from 'flexbox-react';
import Truncate from 'react-truncate';
import Price from './Price'
import ProductButton from './ProductButton'
import ProductImage from './ProductImage'
import { isDeviceConsideredMobile } from '../../utils/appUtils'
import { detailsUrl } from '../../data/urls'
import './Product.css'

const showMobileProduct = (product, link) => {
  return (
    <Flexbox flexBasis="100%" flexWrap="wrap" padding="10px">
        <Flexbox flexBasis="40%" justifyContent="center">
          <ProductImage images={product.imageUrls} size="medium" hover={false} link={ link }/>
        </Flexbox>
        <Flexbox flexBasis="2%" flexWrap="wrap">
        </Flexbox>
        <Flexbox flexBasis="58%" flexWrap="wrap">
          <Flexbox flexBasis="100%" className="ProductName">
            <Truncate lines={1}>
              {product.name}
            </Truncate>
          </Flexbox>
          <Flexbox flexBasis="100%" justifyContent="flex-start" marginTop="5px">
              <Price price={product.price.displayPrice} />
          </Flexbox>
          <Flexbox flexBasis="100%" justifyContent="center" marginTop="5px">
            <ProductButton link={ link } translationKey="product.goToDetails" />
          </Flexbox>
        </Flexbox>
    </Flexbox>
  )
}

const showDesktopProduct = (product, link) => {
  return (
    <Flexbox flexBasis="100%" flexWrap="wrap" maxWidth="170px" padding="10px" marginBottom="10px">
        <Flexbox flexBasis="100%" justifyContent="center">
          <ProductImage images={product.imageUrls} size="medium" hover={true} link={ link }/>
        </Flexbox>
      <Flexbox flexBasis="100%" className="ProductName" marginTop="10px">
        <Truncate lines={2}>
          {product.name}
        </Truncate>
      </Flexbox>
      <Flexbox flexBasis="50%" justifyContent="flex-start" marginTop="5px">
          <Price price={product.price.displayPrice} />
      </Flexbox>
      {/* <Flexbox flexBasis="50%" justifyContent="flex-end" marginTop="5px">
          <Ratings ratings={product.ratings} />
      </Flexbox> */}
      <Flexbox flexBasis="90%" justifyContent="center" marginTop="5px">
        <ProductButton link={ link } translationKey="product.goToDetails" />
      </Flexbox>
    </Flexbox>
  )
}

const Product = ({product}) => {
  const link = `/${getShortenedLocale()}${detailsUrl}/?id=${product.id}`
  return (
    <Flexbox flexBasis="100%" justifyContent="center" className="Product">
      {isDeviceConsideredMobile() ? showMobileProduct(product, link) : showDesktopProduct(product, link)}
    </Flexbox>
  );
}

export default Product
