import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {fetchDetails} from '../../data/modules/details'
import Flexbox from 'flexbox-react';
import { Link} from 'react-router-dom'
import _last from 'lodash/last'
import ReactSVG from 'react-svg'
import loader from '../../images/loader.svg'
import placeholderImage from '../../images/product-placeholder.jpg'
import Ratings from '../presentational/Ratings'
import Price from '../presentational/Price'
import './Details.css';

const showLoader = isFetching => (isFetching && <Flexbox flexBasis="100%" justifyContent="center"><ReactSVG path={loader} /></Flexbox>)

const showDetails = (details, isFetching) => (!isFetching && (
  <Flexbox flexBasis="100%" flexWrap="wrap" padding="20px">
    <Flexbox flexBasis="100%" justifyContent="center" marginBottom="10px">
      <Flexbox flexBasis="90%" justifyContent="center">
        <img src={placeholderImage} />
      </Flexbox>
    </Flexbox>
    <Flexbox flexBasis="100%" marginBottom="10px">
        <b>{details.name}</b>
    </Flexbox>
    <Flexbox flexBasis="100%" marginBottom="10px">
      <Ratings ratings={details.ratings} />
    </Flexbox>
    <Flexbox flexBasis="100%" marginBottom="10px">
      <Price price={details.price} />
    </Flexbox>
    <Flexbox flexBasis="100%" marginBottom="10px">
      <p>{details.description}</p>
    </Flexbox>
    <Flexbox flexBasis="100%" justifyContent="center" marginBottom="10px">
      <button>Go to product</button>
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
      <div className="DetailsContainer">
        { showLoader(this.props.isFetching) }
        { showDetails(this.props.details, this.props.isFetching) }
      </div>
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
