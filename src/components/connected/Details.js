import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchDetails } from '../../data/modules/details'
import { selectResult, resetSelectedResult } from '../../data/modules/results'
import counterpart from 'counterpart'
import Flexbox from 'flexbox-react';
import Price from '../presentational/Price'
import ProductImageGallery from '../presentational/ProductImageGallery'
import Translate from 'react-translate-component'
import { isDeviceConsideredMobile, getAppParam } from '../../utils/appUtils'
import _get from 'lodash/get'
import _merge from 'lodash/merge'
import _toArray from 'lodash/toArray'
import { trackClickout } from '../../data/tracking'
import './Details.css';

function escapeHTML(data) {
    return {__html: data}
}

const showError = () => null
// const showError = () => (<h3 className="Results-Error Results-ErrorTechnical">{ counterpart('results.technicalError') }</h3>)

const flattenImagesBySize = (images, size, target) => (
  images && _get(images, size).map(image => ({[target]: image}))
)

const showMobileDetails = (props, state, track, onImageLoad) => {
  const imagesForGallery = _toArray(_merge(
    flattenImagesBySize(props.details.imageUrls, 'tiny', 'thumbnail'),
    flattenImagesBySize(props.details.imageUrls, 'large', 'original')
  ))

  return (!props.isFetching && !props.hasFailedFetching) ? (
  <Flexbox className="DetailsContainer" flexBasis="100%" flexWrap="wrap" minHeight="80vh"> 
    <Flexbox className="Details DetailsMobile" flexWrap="wrap" flexDirection="column">
      <Flexbox justifyContent="center">
        <Flexbox>
          <ProductImageGallery onImageLoad={onImageLoad} images={imagesForGallery} />
        </Flexbox>
      </Flexbox>
      <Flexbox flexDirection="column" justifyContent="center" margin="20px" padding="20px 0">
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
            (!!props.details.description ) && props.details.description.map((d, i) => (
              <Flexbox key={ `description-${ i }`} margin="5px" dangerouslySetInnerHTML={escapeHTML('-&nbsp;' + d)}></Flexbox>
            ))
          }
        </Flexbox>
      </Flexbox>
    </Flexbox>
  </Flexbox>
  ) :
  <Flexbox className="DetailsContainer" flexBasis="100%" flexWrap="wrap" minHeight="100vh"> </Flexbox>
}

const showDesktopDetails = (props, state, track, onImageLoad) => {
  const imagesForGallery = _toArray(_merge(
    flattenImagesBySize(props.details.imageUrls, 'tiny', 'thumbnail'),
    flattenImagesBySize(props.details.imageUrls, 'large', 'original')
  ))

  return (!props.isFetching && !props.hasFailedFetching) && (
    <Flexbox className="DetailsContainer" flexBasis="100%" flexWrap="wrap">
      <Flexbox className="Details DetailsDesktop" flexBasis="100%" flexWrap="wrap" padding="20px">
        <Flexbox flexBasis="50%" justifyContent="center" marginBottom="10px" maxWidth="50%">
          {/* { state.showSpinnerInsteadOfImages && <Loader/> } */}
          <Flexbox style={ state.showSpinnerInsteadOfImages ? {display: 'none'} : {display: 'block'}} marginRight="120px">
            <ProductImageGallery onImageLoad={onImageLoad} images={imagesForGallery} />
          </Flexbox>
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
              (!!props.details.description) && props.details.description.map((d, i) => (
                <Flexbox key={ `description-${ i }`} margin="5px" dangerouslySetInnerHTML={escapeHTML('-&nbsp;' + d)}></Flexbox>
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
    </Flexbox>
)}

class DetailsContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showSpinnerInsteadOfImages: true,
      showDetails: false
    }
    this._trackClick = this._trackClick.bind(this)
    this._onDetailsImageLoad = this._onDetailsImageLoad.bind(this)
  }

  componentDidMount() {
    // get id from props when mounted thru modal, search param thru modal
    const id = this.props.id ? this.props.id : getAppParam('id')

    if (id) {
      this.props.fetchDetails(id)
    }
  }

  componentWillReceiveProps(nextProps) {
    // when loading with ?id=x in URL, let's select the result so that it's shown in the details box
    // but only do that when no result was previously selected otherwise the box won't be wiped after change of cat/age/...
    if(this.props.details !== nextProps.details && nextProps.details.id && nextProps.selectedResult === null) {
      this.props.selectResult(nextProps.details.id)
    }
    if(nextProps.selectedResult !== this.props.selectedResult) {
      // it means the resetSelectResult function has been called so we wipe the box out
      if (!this.props.selectedResult || (this.props.selectedResult && nextProps.selectedResult === null)) {
        this.setState({  showDetails: false })
      }
      else {
        this.setState({  showDetails: true })
        this.setState({showSpinnerInsteadOfImages: true})
        this.props.fetchDetails(nextProps.selectedResult)
      }
    }
  }

  componentWillUnmount() {
    this.props.resetSelectedResult()
  }

  _trackClick(event) {
    trackClickout(this.props.details.price.displayPrice)
  }

  _onDetailsImageLoad(e) {
    this.setState({showSpinnerInsteadOfImages: false})
  }

  render() {
    const { hasFailedFetching } = this.props
    const selectedResult = this.props.selectedResult

    return selectedResult? (
      <Flexbox>
        {/* { isFetching \&& showLoader(isFetching) } */}
        { hasFailedFetching && showError(hasFailedFetching) }
        { isDeviceConsideredMobile() ?
          showMobileDetails(this.props, this.state, this._trackClick, this._onDetailsImageLoad) :
          showDesktopDetails(this.props, this.state, this._trackClick, this._onDetailsImageLoad)
        }
      </Flexbox>
    ) :
    null
  }
}

DetailsContainer.propTypes = {
  details : PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    selectedResult: state.results.selectedResult,
    details: state.details.details,
    isFetching: state.details.isFetching,
    hasFailedFetching: state.details.hasFailedFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDetails: id => dispatch(fetchDetails(id)),
    selectResult: id => dispatch(selectResult(id)),
    resetSelectedResult: id => dispatch(resetSelectedResult(id))
  }
}

const Details = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsContainer))

export default Details;
