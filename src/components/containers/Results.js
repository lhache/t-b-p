import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Results.css';
import {fetchResults} from '../../data/results/results'


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
        {results.map(res => (
          <div>{res.name}</div>
        ))}
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
    results: state.results.results
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
