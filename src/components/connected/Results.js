import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Translate from 'react-translate-component'
import { fetchResults, storeTerm, storeSelectedCategories }  from '../../data/modules/searchResults'
import Loader from '../presentational/Loader'
import Product from '../presentational/Product'
import Flexbox from 'flexbox-react';
import { joinTermToStringWithSymbol } from '../../utils/appUtils'
import { parseQueryString } from '../../data/utils'
import _get from 'lodash/get'
import _take from 'lodash/take'
import _isFinite from 'lodash/isFinite'
import './Results.css';

const showLoader = () => (<Loader />)

const showError = () => (<p>technical error</p>)

const showNoResultsMessage = () => (<p>No results found</p>)

const showResults = (results) => (
  <Flexbox maxWidth="100%" flexWrap="wrap">
      {results.map((result, idx) => (
        <Flexbox key={Math.random() + result.id} order={idx}>
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
    const selectedCategories = this.props.hardcodedCategory ?
      this.props.hardcodedCategory :
      this.props.selectedCategories

    this.props.fetchResults(this.props.term, selectedCategories, this.props.age)
  }

  _fetchMoreResults() {
    this.props.fetchResults(this.props.term, this.props.selectedCategories, this.props.age, this.props.results.length)
  }

  render() {
    const {
      hideLoadMore,
      maxItems,
      results,
      isFetching,
      hasFailedFetching,
      selectedCategories
    } = this.props

    const hasResults = !!results.length
    const hasFiniteAmountOfResults = results.length % 20 === 0
    const trimmedResults = maxItems ? _take(results, maxItems) : results;

    return (
      <Flexbox flexWrap="wrap" className="ResultsContainer" maxWidth="100%">
        { (isFetching && !hasResults) && showLoader() }
        { (hasFailedFetching) && showError() }
        { (!hasFailedFetching && !hasResults && !isFetching) && showNoResultsMessage() }
        { (!hasFailedFetching) &&  showResults(trimmedResults)}
        { (!hideLoadMore && hasResults && hasFiniteAmountOfResults ) && showLoadMore(this._fetchMoreResults)}
      </Flexbox>
    )
  }
}

ResultsContainer.propTypes = {
  term : PropTypes.string.isRequired,
  selectedCategories : PropTypes.array.isRequired,
  age : PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  storeTerm: PropTypes.func.isRequired,
  storeSelectedCategories: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    age: state.searchResults.age,
    term: state.searchResults.term,
    selectedCategories: state.searchResults.selectedCategories,
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
    storeSelectedCategories: term => {
      dispatch(storeSelectedCategories(term))
    },
    fetchResults: (term, categories, age, offset) => {
      dispatch(fetchResults(term, categories, age, offset))
    }
  }
}

const Results = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer))

export default Results;
