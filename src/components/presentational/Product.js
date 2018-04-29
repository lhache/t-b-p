import React from 'react'
import { getShortenedLocale } from '../../data/translations/translations'
import Flexbox from 'flexbox-react'
import Translate from 'react-translate-component'
import Truncate from 'react-truncate';
import Price from './Price'
import { Link } from 'react-router-dom'
import ProductButton from './ProductButton'
import ProductImage from './ProductImage'
import { isDeviceConsideredMobile } from '../../utils/appUtils'
import { detailsUrl } from '../../data/urls'
import './Product.css'

const showMobileProduct = (props, link, select) => {
  const { product } = props
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
              <Price price={ product.price ? product.price.displayPrice : ''} />
          </Flexbox>
          <Flexbox flexBasis="100%" justifyContent="center" marginTop="5px">
            <Link className="ProductButtonLink" to={link}>
              <button className="ProductButton">
                <Translate content="product.goToDetails" />
              </button>
            </Link>
          </Flexbox>
        </Flexbox>
    </Flexbox>
  )
}

const showDesktopProduct = (props, link, select) => {
  const { product } = props
  return (
      <Flexbox flexBasis="100%" flexWrap="wrap" maxWidth="170px" padding="10px" marginBottom="10px">
          <Flexbox flexBasis="100%" justifyContent="center" onClick={select} >
            <ProductImage images={product.imageUrls} size="medium" hover={true}/>
          </Flexbox>
        <Flexbox flexBasis="100%" className="ProductName" marginTop="10px">
          <Truncate lines={2}>
            {product.name}
          </Truncate>
        </Flexbox>
        <Flexbox flexBasis="50%" justifyContent="flex-start" marginTop="5px">
          <Price price={ product.price ? product.price.displayPrice : ''} />
        </Flexbox>
        <Flexbox flexBasis="90%" justifyContent="center" marginTop="5px">
          <ProductButton onClick={select} translationKey="product.goToDetails" />
        </Flexbox>
      </Flexbox>
  )
}


class Product extends React.Component {

  constructor(props) {
    super(props)
    this._select = this._select.bind(this)
  }

  _select() {
    this.props.select(this.props.product.id)
  }

  render() {
    const link = `/${getShortenedLocale()}${detailsUrl}/?id=${this.props.product.id}`
    return (
      <Flexbox flexBasis="100%" justifyContent="center" className="Product">
        {isDeviceConsideredMobile() ?
          showMobileProduct(this.props, link, this._select) :
          showDesktopProduct(this.props, link, this._select)
        }
      </Flexbox>
    )
  }
}

export default Product
