import React, { Component } from 'react';
import { connect } from 'react-redux'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import Translate from 'react-translate-component'
import { fetchResults, storeTerm, storeSelectedCategories }  from '../../data/modules/searchResults'
import { getCategoryKey } from '../../utils/appUtils'
import Loader from '../presentational/Loader'
import Product from '../presentational/Product'
import Flexbox from 'flexbox-react';
import _take from 'lodash/take'
import _get from 'lodash/get'
import './Results.css';

const showLoader = () => (<Loader />)

const showError = () => (
  <h3 className="Results-Error Results-ErrorTechnical">{ counterpart('results.technicalError') }</h3>
)

const showNoResultsMessage = () => (
  <h3 className="Results-Error Results-ErrorNoResults">{ counterpart('results.noResultsFound') }</h3>
)

const showResults = (results) => (
  <Flexbox maxWidth="100%" flexWrap="wrap">
      {results.map((result, idx) => (
        <Flexbox key={Math.random() + result.id} order={idx} className="fadeIn duration-500">
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
    const selectedCategories = this.props.hardcodedCategories ?
      this.props.hardcodedCategories :
      this.props.selectedCategories

    this.props.fetchResults(this.props.term, selectedCategories, this.props.age)
  }

  // don't update when results are the same
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.results !== nextProps.results
  }

  _fetchMoreResults() {
    this.props.fetchResults(this.props.term, this.props.selectedCategories, this.props.age, _get(this.props.results, getCategoryKey(this.props.selectedCategories)).length)
  }

  render() {
    const {
      hideLoadMore,
      maxItems,
      results,
      isFetching,
      hasFailedFetching,
      searchedCategories,
      hardcodedCategories
    } = this.props

    const categories = hardcodedCategories ? hardcodedCategories : searchedCategories
    const resultsForCategory = _get(results, getCategoryKey(categories))

    if (resultsForCategory) {
        const hasResults = !!resultsForCategory.length
        const hasFiniteAmountOfResults = resultsForCategory.length % 20 === 0
        const trimmedResults = maxItems ? _take(resultsForCategory, maxItems) : resultsForCategory

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
    return (<Flexbox flexWrap="wrap" className="ResultsContainer" maxWidth="100%"></Flexbox>)
  }
}

ResultsContainer.propTypes = {
  term : PropTypes.string.isRequired,
  selectedCategories : PropTypes.array.isRequired,
  searchedCategories : PropTypes.array.isRequired,
  age : PropTypes.object.isRequired,
  results: PropTypes.object.isRequired,
  storeTerm: PropTypes.func.isRequired,
  storeSelectedCategories: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    age: state.searchResults.age,
    term: state.searchResults.term,
    selectedCategories: state.searchResults.selectedCategories,
    searchedCategories: state.searchResults.searchedCategories,
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

const Results = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer)

export default Results;
