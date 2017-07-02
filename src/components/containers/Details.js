import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Details.css';
import {fetchDetails} from '../../data/modules/details'
import { Link} from 'react-router-dom'
import _last from 'lodash/last'


class DetailsContainer extends Component {

  componentDidMount() {
    let id = _last(this.props.history.location.pathname.split('/'))
    this.props.fetchDetails(id)
  }

  render() {
    const {details, fetchDetails} = this.props

    return (
      <div className="DetailsContainer">
        <p>{details.name}</p>
        <p>{details.shopName}</p>
        <p>{details.ratings} stars rating</p>
        <p>{details.description}</p>
        <p>{details.name}</p>
      </div>
    )
  }
}

DetailsContainer.propTypes = {
  id: PropTypes.string,
  fetchDetails: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    details: state.details.details
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
