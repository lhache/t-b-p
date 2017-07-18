import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchResults, storeSearchedTerm }  from '../../data/modules/searchResults'
import ResultsHeadline from '../presentational/ResultsHeadline'
import Product from '../presentational/Product'
import Flexbox from 'flexbox-react';
import { parseQueryString } from '../../data/utils'
import './Results.css';

const showLoader = isFetching => (isFetching && <p>loading...</p>)

const showResults = (results, isFetching) => (!isFetching && (
  <Flexbox maxWidth="100%" flexWrap="wrap" justifyContent="center">
      {results.map((result, idx) => (
        <Flexbox key={result.id} order={idx} maxWidth="220px">
          <Product product={result} />
        </Flexbox>
      ))}
  </Flexbox>
))

class ResultsContainer extends Component {

  componentDidMount() {
    // set searchedTerm and fetch results at page load
    const queries = parseQueryString(this.props.history.location.search);
    const term = queries['q'];
    this.props.storeSearchedTerm(term)
    this.props.fetchResults(term)
  }

  componentWillReceiveProps(nextProps) {
    // set searchedTerm and fetch results after from submitted again
    if (this.props.searchedTerm !== '' && this.props.searchedTerm !== nextProps.searchedTerm) {
      const queries = parseQueryString(this.props.history.location.search);
      const term = queries['q'];
      this.props.storeSearchedTerm(term)
      this.props.fetchResults(term)
    }
  }

  render() {
    const {searchedTerm, results, fetchResults} = this.props

    return (
      <Flexbox flexWrap="wrap" className="ResultsContainer" maxWidth="100%">
        <ResultsHeadline type="results" term={this.props.searchedTerm} />
        { showLoader(this.props.isFetching) }
        { showResults(this.props.results, this.props.isFetching) }
      </Flexbox>
    )
  }
}

ResultsContainer.propTypes = {
  searchedTerm : PropTypes.array.isRequired,
  results: PropTypes.array.isRequired,
  fetchResults: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    searchedTerm: state.searchResults.searchedTerm,
    results: state.searchResults.results,
    isFetching: state.searchResults.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResults: term => {
      dispatch(fetchResults(term))
    },
    storeSearchedTerm: term => {
      dispatch(storeSearchedTerm(term))
    }
  }
}

const Results = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer))

export default Results;
