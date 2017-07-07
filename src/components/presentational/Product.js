import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Link} from 'react-router-dom'
import './Product.css'
import Translate from 'react-translate-component'
import Price from './Price'
import Ratings from './Ratings'
import ProductButton from './ProductButton'
import ProductImage from './ProductImage'

const Product = ({product}) => {
  return (
    <Row className="Product">
      <Col xs={12} lg={12}>
        <Row center="xs">
          <ProductImage />
        </Row>
      </Col>
      <Col xs={12} lg={12}>
        <Row center="xs">
          <p>{product.name}</p>
        </Row>
      </Col>
      <Col xs={12} lg={6}>
          <Price price={product.price} />
      </Col>
      <Col xs={12} lg={6}>
          <Ratings ratings={product.ratings} />
      </Col>
      <Col xs={12} lg={12}>
        <Row center="xs">
          <ProductButton link={`/details/${product.id}`} />
        </Row>
      </Col>
    </Row>
  );
}

export default Product
