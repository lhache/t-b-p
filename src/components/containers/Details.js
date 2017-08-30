import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {fetchDetails} from '../../data/modules/details'
import Flexbox from 'flexbox-react';
import _last from 'lodash/last'
import ReactSVG from 'react-svg'
import loader from '../../images/loader.svg'
import placeholderImage from '../../images/product-placeholder.jpg'
import Ratings from '../presentational/Ratings'
import Price from '../presentational/Price'
import ProductButton from '../presentational/ProductButton'
import './Details.css';

const showLoader = isFetching => (isFetching && <Flexbox flexBasis="100%" justifyContent="center"><ReactSVG path={loader} /></Flexbox>)

const showDetails = (details, isFetching) => (!isFetching && (
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
    let id = _last(this.props.history.location.pathname.split('/'))
    this.props.fetchDetails(id)
  }

  render() {
    const {details, isFetching, fetchDetails} = this.props

    return (
      <Flexbox className="DetailsContainer" flexBasis="100%" flexWrap="wrap">
        { showLoader(isFetching) }
        { showDetails(details, isFetching) }
      </Flexbox>
    )
  }
}

const mapStateToProps = state => {
  return {
    details: state.details.details,
    isFetching: state.details.isFetching
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
