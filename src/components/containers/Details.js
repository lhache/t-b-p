import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Details.css';
import {fetchDetails} from '../../data/modules/details'
import { Link} from 'react-router-dom'
import _last from 'lodash/last'

const showLoader = isFetching => (isFetching && <p>loading...</p>)

const showDetails = (details, isFetching) => (!isFetching && (
  <div>
    <p>{details.name}</p>
    <p>{details.shopName}</p>
    <p>{details.ratings}</p>
    <p>{details.description}</p>
    <p>{details.name}</p>
  </div>
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
