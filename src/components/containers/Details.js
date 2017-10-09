import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {fetchDetails} from '../../data/modules/details'
import Flexbox from 'flexbox-react';
import Loader from '../presentational/Loader'
import Price from '../presentational/Price'
import ProductButton from '../presentational/ProductButton'
import ProductImageGallery from '../presentational/ProductImageGallery'
import { parseQueryString } from '../../data/utils'
import { isDeviceConsideredMobile } from '../../data/utils'
import _get from 'lodash/get'
import _merge from 'lodash/merge'
import _toArray from 'lodash/toArray'
import './Details.css';

const showLoader = isFetching => (isFetching && <Loader />)

const showError = hasFailedFetching => (hasFailedFetching && <p>error</p>)

const flattenImagesBySize = (images, size, target) => (
  images && _get(images, size).map(image => ({[target]: image}))
)

const showMobileDetails = (props) => {
  const imagesForGallery = _toArray(_merge(
    flattenImagesBySize(props.details.imageUrls, 'tiny', 'thumbnail'),
    flattenImagesBySize(props.details.imageUrls, 'large', 'original')
  ))

  return (!props.isFetching && !props.hasFailedFetching) && (
  <Flexbox className="Details" flexBasis="100%" flexWrap="wrap" flexDirection="column" width="100%">
    <Flexbox justifyContent="center" margin="20px">
      <ProductImageGallery images={imagesForGallery} />
    </Flexbox>
    <Flexbox flexDirection="column" justifyContent="center" margin="20px" padding="20px">
      <Flexbox flexBasis="100%" marginBottom="10px">
          <b className="Details-Name">{props.details.name || ''}</b>
      </Flexbox>
      <Flexbox flexBasis="100%" marginBottom="10px">
        <Price price={props.details.price ? props.details.price.displayPrice : ''} />
      </Flexbox>
      <Flexbox flexBasis="100%" marginBottom="10px">
        <p>{props.details.description || ''}</p>
      </Flexbox>
      <Flexbox flexBasis="100%" justifyContent="center" marginBottom="10px">
        <a href={props.details.deeplinkUrl} target="_blank" rel="noopener noreferrer">lol</a>
        <ProductButton link={`${props.details.deeplinkUrl}`} translationKey="product.goToAffShop"/>
      </Flexbox>
    </Flexbox>
  </Flexbox>
)}

const showDesktopDetails = (props) => {
  const imagesForGallery = _toArray(_merge(
    flattenImagesBySize(props.details.imageUrls, 'tiny', 'thumbnail'),
    flattenImagesBySize(props.details.imageUrls, 'large', 'original')
  ))

  return (!props.isFetching && !props.hasFailedFetching) && (
  <Flexbox className="Details" flexBasis="100%" flexWrap="wrap" padding="20px">
    <Flexbox flexBasis="50%" justifyContent="center" marginBottom="10px" maxWidth="50%">
      <ProductImageGallery images={imagesForGallery} />
    </Flexbox>
    <Flexbox flexBasis="50%" flexWrap="wrap" justifyContent="center" marginBottom="10px">
      <Flexbox flexBasis="100%" marginBottom="10px">
          <b className="Details-Name">{props.details.name || ''}</b>
      </Flexbox>
      <Flexbox flexBasis="100%" marginBottom="10px">
        <Price price={props.details.price ? props.details.price.displayPrice : ''} />
      </Flexbox>
      <Flexbox flexBasis="100%" marginBottom="10px">
        <p>{props.details.description || ''}</p>
      </Flexbox>
      <Flexbox flexBasis="100%" justifyContent="center" marginBottom="10px">
        <a href={props.details.deeplinkUrl} target="_blank" rel="noopener noreferrer">lol</a>
        <ProductButton link={`${props.details.deeplinkUrl}`} translationKey="product.goToAffShop"/>
      </Flexbox>
    </Flexbox>
  </Flexbox>
)}

class DetailsContainer extends Component {

  componentDidMount() {
    const queries = parseQueryString(this.props.history.location.search);
    const id = queries['id'];
    this.props.fetchDetails(id)
  }

  render() {
    return (
      <Flexbox className="DetailsContainer" flexBasis="100%" flexWrap="wrap">
        { showLoader(this.props.isFetching) }
        { showError(this.props.hasFailedFetching) }
        {isDeviceConsideredMobile() ? showMobileDetails(this.props) : showDesktopDetails(this.props)}
      </Flexbox>
    )
  }
}

const mapStateToProps = state => {
  return {
    details: state.details.details,
    isFetching: state.details.isFetching,
    hasFailedFetching: state.details.hasFailedFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDetails: id => {
      dispatch(fetchDetails(id))
    }
  }
}

const Details = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsContainer))

export default Details;
