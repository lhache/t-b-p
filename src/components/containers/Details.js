import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {fetchDetails} from '../../data/modules/details'
import Flexbox from 'flexbox-react';
import _last from 'lodash/last'
import placeholderImage from '../../images/product-placeholder.jpg'
import Ratings from '../presentational/Ratings'
import Loader from '../presentational/Loader'
import Price from '../presentational/Price'
import ProductButton from '../presentational/ProductButton'
import { parseQueryString } from '../../data/utils'
import './Details.css';

const showLoader = isFetching => (isFetching && <Loader />)

const showError = hasFailedFetching => (hasFailedFetching && <p>error</p>)

const showDetails = (details, isFetching, hasFailedFetching) => ((!isFetching && !hasFailedFetching) && (
  <Flexbox flexBasis="100%" flexWrap="wrap" padding="20px">
    <Flexbox flexBasis="100%" justifyContent="center" marginBottom="10px">
      <Flexbox flexBasis="90%" justifyContent="center">
        <img src={placeholderImage} alt=""/>
      </Flexbox>
    </Flexbox>
    <Flexbox flexBasis="100%" marginBottom="10px">
        <b>{details.name || ''}</b>
    </Flexbox>
    <Flexbox flexBasis="100%" marginBottom="10px">
      <Ratings ratings={details.ratings || ''} />
    </Flexbox>
    <Flexbox flexBasis="100%" marginBottom="10px">
      <Price price={details.price || ''} />
    </Flexbox>
    <Flexbox flexBasis="100%" marginBottom="10px">
      <p>{details.description || ''}</p>
    </Flexbox>
    <Flexbox flexBasis="100%" justifyContent="center" marginBottom="10px">
      <ProductButton link={`${details.deeplinkUrl}`} translationKey="product.goToAffShop"/>
    </Flexbox>
  </Flexbox>
))

class DetailsContainer extends Component {

  componentDidMount() {
    const queries = parseQueryString(this.props.history.location.search);
    const id = queries['id'];
    this.props.fetchDetails(id)
  }

  render() {
    const {details, isFetching, hasFailedFetching} = this.props

    return (
      <Flexbox className="DetailsContainer" flexBasis="100%" flexWrap="wrap">
        { showLoader(isFetching) }
        { showError(hasFailedFetching) }
        { showDetails(details, isFetching, hasFailedFetching) }
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
