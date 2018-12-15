import React from 'react'
import { withRouter } from 'react-router'
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

const showMobileProduct = (props, select) => {
  const { product } = props
  return (
      <Flexbox flexBasis="100%" flexWrap="wrap" onClick={ () => select(product.id) }>
          <Flexbox flexBasis="40%" justifyContent="center">
            <ProductImage images={product.imageUrls} size="medium" hover={false} />
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
              <div className="ProductButtonLink">
                <button className="ProductButton">
                  <Translate content="product.goToDetails" />
                </button>
              </div>
            </Flexbox>
          </Flexbox>
      </Flexbox>
  )
}

const showDesktopProduct = (props, select) => {
  const { product } = props
  return (
      <Flexbox flexBasis="100%" flexWrap="wrap" maxWidth="170px" marginBottom="10px">
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

  _routeToProduct(id) {
    const url = `/${getShortenedLocale()}${detailsUrl}/?id=${id}`

    this.props.history.push(url)
  }

  render() {
    return (
      <Flexbox flexBasis="100%" justifyContent="center" className="Product" padding="10px" >
        {isDeviceConsideredMobile() ?
          showMobileProduct(this.props, (id) => this._routeToProduct(id) ) :
          showDesktopProduct(this.props, this._select)
        }
      </Flexbox>
    )
  }
}

export default withRouter(Product)
