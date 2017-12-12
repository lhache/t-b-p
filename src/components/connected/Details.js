import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchDetails } from '../../data/modules/details'
import counterpart from 'counterpart'
import Flexbox from 'flexbox-react';
import Loader from '../presentational/Loader'
import Price from '../presentational/Price'
import ProductImageGallery from '../presentational/ProductImageGallery'
import Translate from 'react-translate-component'
import { parseQueryString, isDeviceConsideredMobile } from '../../utils/appUtils'
import _get from 'lodash/get'
import _merge from 'lodash/merge'
import _toArray from 'lodash/toArray'
import './Details.css';

function escapeHTML(data) {
    return {__html: data}
}

const showLoader = () => (<Loader />)

const showError = () => (<h3 className="Results-Error Results-ErrorTechnical">{ counterpart('results.technicalError') }</h3>)

const flattenImagesBySize = (images, size, target) => (
  images && _get(images, size).map(image => ({[target]: image}))
)

const showMobileDetails = (props, track) => {
  const imagesForGallery = _toArray(_merge(
    flattenImagesBySize(props.details.imageUrls, 'tiny', 'thumbnail'),
    flattenImagesBySize(props.details.imageUrls, 'large', 'original')
  ))

  return (!props.isFetching && !props.hasFailedFetching) && (
  <Flexbox className="Details" flexWrap="wrap" flexDirection="column">
    <Flexbox justifyContent="center">
      <ProductImageGallery images={imagesForGallery} />
    </Flexbox>
    <Flexbox flexDirection="column" justifyContent="center" margin="20px" padding="20px">
      <Flexbox flexBasis="100%" marginBottom="10px">
          <b className="Details-Name">{props.details.name || ''}</b>
      </Flexbox>
      <Flexbox marginBottom="10px" justifyContent="flex-end">
        <Price price={props.details.price ? props.details.price.displayPrice : ''} />
      </Flexbox>
      <Flexbox justifyContent="center" marginBottom="10px">
        <a className="ProductButton" href={props.details.deeplinkUrl} target="_blank" rel="noopener noreferrer" onClick={track}>
          <Translate content="product.goToAffShop" />
        </a>
      </Flexbox>

      <Flexbox marginBottom="10px" flexDirection="column">
        {
          (!!props.details.description ) && props.details.description.map(d => (
            <Flexbox margin="5px" dangerouslySetInnerHTML={escapeHTML('-&nbsp;' + d)}></Flexbox>
          ))
        }
      </Flexbox>
    </Flexbox>
  </Flexbox>
)}

const showDesktopDetails = (props, track) => {
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
      <Flexbox flexBasis="100%" marginBottom="10px" flexDirection="column">
        {
          (!!props.details.description) && props.details.description.map(d => (
            <Flexbox key={Math.random()} margin="5px" dangerouslySetInnerHTML={escapeHTML('-&nbsp;' + d)}></Flexbox>
          ))
        }
      </Flexbox>
      <Flexbox flexBasis="100%" justifyContent="center" marginBottom="10px">
        <a className="ProductButton" href={props.details.deeplinkUrl} target="_blank" rel="noopener noreferrer" onClick={track}>
          <Translate content="product.goToAffShop" />
        </a>
      </Flexbox>
    </Flexbox>
  </Flexbox>
)}

class DetailsContainer extends Component {

  constructor(props) {
    super(props)

    this._trackClick = this._trackClick.bind(this)
  }

  componentDidMount() {
    // const queries = parseQueryString(this.props.history.location.search)
    // const id = queries['id']
    this.props.fetchDetails(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.selectedResult !== this.props.selectedResult) {
      this.props.fetchDetails(nextProps.selectedResult)
    }
  }

  _trackClick(event) {
    // TODO add price
    window.ga && window.ga('send', 'event', 'go-to-partner', 'clickout')
  }

  render() {
    const { isFetching, hasFailedFetching } = this.props

    return (
      <Flexbox className="DetailsContainer" flexBasis="100%" flexWrap="wrap">
        { isFetching && showLoader(isFetching) }
        { hasFailedFetching && showError(hasFailedFetching) }
        { isDeviceConsideredMobile() ?
          showMobileDetails(this.props, this._trackClick) :
          showDesktopDetails(this.props, this._trackClick)
        }
      </Flexbox>
    )
  }
}

DetailsContainer.propTypes = {
  details : PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    selectedResult: state.searchResults.selectedResult,
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
