import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Translate from 'react-translate-component'
import { fetchResults, storeTerm, storeSelectedTerms, storeAge }  from '../../data/modules/searchResults'
import ResultsHeadline from '../presentational/ResultsHeadline'
import Loader from '../presentational/Loader'
import Product from '../presentational/Product'
import Flexbox from 'flexbox-react';
import { joinTermToStringWithSymbol } from '../../utils/appUtils'
import { parseQueryString } from '../../data/utils'
import _get from 'lodash/get'
import _first from 'lodash/first'
import _last from 'lodash/last'
import './Results.css';

const showLoader = () => (<Loader />)

const showError = () => (<p>technical error</p>)

const showNoResultsMessage = () => (<p>No results found</p>)

const showHeadline = (terms) => (
  <ResultsHeadline type="results" term={joinTermToStringWithSymbol(terms, 'name', ' - ')} />
)

const showResults = (results) => (
  <Flexbox maxWidth="100%" flexWrap="wrap">
      {results.map((result, idx) => (
        <Flexbox key={result.id} order={idx}>
          <Product product={result} />
        </Flexbox>
      ))}
  </Flexbox>
)

const showLoadMore = (fetchMore) => (
  <Flexbox justifyContent="center" flexBasis="100%">
    <button className="ResultsLoadMoreButton" onClick={fetchMore}>
      <Translate content="results.loadMore" />
    </button>
  </Flexbox>
)

class ResultsContainer extends Component {

  constructor(props) {
    super(props)
    this._fetchMoreResults = this._fetchMoreResults.bind(this)
  }


  componentDidMount() {
    const searchParams = parseQueryString(this.props.history.location.search)
    const ageFrom = _get(searchParams, 'age_from')
    const ageUntil = _get(searchParams, 'age_until')
    const age = {}

    ageFrom && Object.assign(age, { age_from: ageFrom })
    ageUntil && Object.assign(age, { age_until: ageUntil })
    this.props.storeAge(age)
    this.props.fetchResults(this.props.term, this.props.term, age)
  }

  _fetchMoreResults() {
    this.props.fetchResults(this.props.term, this.props.term, this.props.age, this.props.results.length)
  }

  render() {
    const {results, isFetching, hasFailedFetching, selectedTerms} = this.props
    const hasResults = !!results.length

    return (
      <Flexbox flexWrap="wrap" className="ResultsContainer" maxWidth="100%">
        { hasResults && showHeadline(selectedTerms)}
        { (isFetching && !hasResults) && showLoader() }
        { hasFailedFetching && showError() }
        { (!hasFailedFetching && !hasResults && !isFetching) && showNoResultsMessage() }
        { !hasFailedFetching &&  showResults(results)}
        { (hasResults && results.length >= 20 ) && showLoadMore(this._fetchMoreResults)}
      </Flexbox>
    )
  }
}

ResultsContainer.propTypes = {
  term : PropTypes.string.isRequired,
  selectedTerms : PropTypes.array.isRequired,
  age : PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  storeTerm: PropTypes.func.isRequired,
  storeSelectedTerms: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    term: state.searchResults.term,
    selectedTerms: state.searchResults.selectedTerms,
    age: state.searchResults.age,
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
    storeAge: age => {
      dispatch(storeAge(age))
    },
    storeSelectedTerms: term => {
      dispatch(storeSelectedTerms(term))
    },
    fetchResults: (term, categories, offset) => {
      dispatch(fetchResults(term, categories, offset))
    }
  }
}

const Results = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer))

export default Results;
