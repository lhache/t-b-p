import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Results.css';
import {fetchResults} from '../../data/modules/results'
import { Link} from 'react-router-dom'

const showLoader = isFetching => (isFetching && <p>loading...</p>)

const showResults = (results, isFetching) => (!isFetching && (
  <div>
    {results.map(res => (
      <div key={res.id}>
        <Link to={`/details/${res.id}`}>{res.name}</Link>
      </div>
    ))}
  </div>
))

class ResultsContainer extends Component {

  componentDidMount() {
    // TODO remove from here
    var parseQueryString = (str = "") => {
      let objURL = {};
      str.replace(
          new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
          function( $0, $1, $2, $3 ){
              objURL[ $1 ] = $3;
          }
      );
      return objURL;
    };

    const queries = parseQueryString(this.props.history.location.search);
    this.props.fetchResults(queries['q'])
  }

  render() {
    const {results, fetchResults} = this.props

    return (
      <div className="ResultsContainer">
        { showLoader(this.props.isFetching) }
        { showResults(this.props.results, this.props.isFetching) }
      </div>
    )
  }
}

ResultsContainer.propTypes = {
  term: PropTypes.string,
  fetchResults: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    results: state.results.results,
    isFetching: state.results.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResults: term => {
      dispatch(fetchResults(term))
    }
  }
}

const Results = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer))

export default Results;
