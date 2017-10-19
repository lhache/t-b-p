import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchResults, storeTerm, storeSelectedTerms, fetchSuggestOptions }  from '../../data/modules/searchResults'
import ResultsHeadline from '../presentational/ResultsHeadline'
import Loader from '../presentational/Loader'
import Product from '../presentational/Product'
import Flexbox from 'flexbox-react';
import { parseQueryString } from '../../data/utils'
import { joinTermToStringWithSymbol } from '../../utils/appUtils'
import './Results.css';

const showLoader = isFetching => (isFetching && <Loader />)

const showError = hasFailedFetching => (hasFailedFetching && <p>error</p>)

const showResults = (results, isFetching, hasFailedFetching) => ((!isFetching && !hasFailedFetching) && (
  <Flexbox maxWidth="100%" flexWrap="wrap" justifyContent="center">
      {results.map((result, idx) => (
        <Flexbox key={result.id} order={idx}>
          <Product product={result} />
        </Flexbox>
      ))}
  </Flexbox>
))

class ResultsContainer extends Component {

  componentDidMount() {
    // set selectedTerms and fetch results at page load
    const queries = parseQueryString(this.props.history.location.search);
    let term = decodeURIComponent(queries['q']);

    // this.props.fetchSuggestOptions(term)

    if (term) {
      console.log('log term in Results')
      console.log(this.props.term)
      // debugger;
      this.props.fetchResults(this.props.term, this.props.term)
    }
  }

  componentWillReceiveProps(nextProps) {
    // set selectedTerms and fetch results at form submission
    // if (this.props.selectedTerms !== nextProps.selectedTerms) {
    //   this.props.fetchResults(nextProps.selectedTerms)
    // }
  }

  render() {
    const {results, isFetching, hasFailedFetching, selectedTerms} = this.props

    return (
      <Flexbox flexWrap="wrap" className="ResultsContainer" maxWidth="100%">
        <ResultsHeadline type="results" term={joinTermToStringWithSymbol(selectedTerms, 'name', ' - ')} />
        { showLoader(isFetching) }
        { showError(hasFailedFetching) }
        { showResults(results, isFetching, hasFailedFetching) }
      </Flexbox>
    )
  }
}

ResultsContainer.propTypes = {
  term : PropTypes.string.isRequired,
  selectedTerms : PropTypes.array.isRequired,
  results: PropTypes.array.isRequired,
  storeTerm: PropTypes.func.isRequired,
  storeSelectedTerms: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    term: state.searchResults.term,
    selectedTerms: state.searchResults.selectedTerms,
    results: state.searchResults.results,
    isFetching: state.searchResults.isFetching,
    hasFailedFetching: state.searchResults.hasFailedFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeTerm: term => {
      dispatch(storeTerm(term))
    },
    storeSelectedTerms: term => {
      dispatch(storeSelectedTerms(term))
    },
    fetchResults: (term, categories) => {
      dispatch(fetchResults(term, categories))
    }
  }
}

const Results = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer))

export default Results;
