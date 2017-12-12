import React, { Component } from 'react';
import { connect } from 'react-redux'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import Translate from 'react-translate-component'
import DetailsModal from '../presentational/DetailsModal'
import { fetchResults, storeTerm, storeSelectedCategories, selectResult }  from '../../data/modules/searchResults'
import { getCategoryKey } from '../../utils/appUtils'
import Loader from '../presentational/Loader'
import Product from '../presentational/Product'
import Flexbox from 'flexbox-react';
import _take from 'lodash/take'
import _get from 'lodash/get'
import _find from 'lodash/find'
import './Results.css'

const getIndexOfResult = (results, lookup) => {
  return results.indexOf(_find(results, lookup))
}

const showLoader = () => (<Loader />)

const showError = () => (
  <h3 className="Results-Error Results-ErrorTechnical">{ counterpart('results.technicalError') }</h3>
)

const showNoResultsMessage = () => (
  <h3 className="Results-Error Results-ErrorNoResults">{ counterpart('results.noResultsFound') }</h3>
)

const showResults = (results, selectResult) => (
  <Flexbox maxWidth="100%" flexWrap="wrap">
      {results.map((result, idx) => (
        <Flexbox key={Math.random() + result.id} order={idx} className="fadeIn duration-500">
          <Product product={result} select={selectResult} />
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
    this.state = {
      modalIsOpen: false
    }
    this._closeDetails = this._closeDetails.bind(this)
    this._fetchMoreResults = this._fetchMoreResults.bind(this)
    this._showProductDetails = this._showProductDetails.bind(this)
    this._showNextProductDetails = this._showNextProductDetails.bind(this)
    this._showPrevProductDetails = this._showPrevProductDetails.bind(this)
  }


  componentDidMount() {
    const selectedCategories = this.props.hardcodedCategories ?
      this.props.hardcodedCategories :
      this.props.selectedCategories

    this.props.fetchResults(this.props.term, selectedCategories, this.props.age)
  }

  // don't update when results are the same
  shouldComponentUpdate(nextProps, nextState) {

    if (this.state.modalIsOpen !== nextState.modalIsOpen) {
      return true
    }
    return this.props.results !== nextProps.results
  }

  _fetchMoreResults() {
    this.props.fetchResults(this.props.term, this.props.selectedCategories, this.props.age, _get(this.props.results, getCategoryKey(this.props.selectedCategories)).length)
  }

  _showProductDetails(id) {
    this.setState({
      modalIsOpen: true,
      resultIdForDetails: id
    })
    this.props.selectResult(id)
  }

  _showNextProductDetails() {
    const category = this.props.hardcodedCategories ? this.props.hardcodedCategories : this.props.searchedCategories
    const results = this.props.results[getCategoryKey(category)]
    const res = _find(results, { id: this.props.selectedResult})
    let index = results.indexOf(res)

    if (index === results.length - 1) {
      index = 0
    } else {
      index = index + 1
    }

    const newResultsId = results[index]
    this.props.selectResult(newResultsId.id)
  }

  _showPrevProductDetails() {
    const category = this.props.hardcodedCategories ? this.props.hardcodedCategories : this.props.searchedCategories
    const results = this.props.results[getCategoryKey(category)]
    const res = _find(results, { id: this.props.selectedResult})
    let index = results.indexOf(res)

    if (index === 0) {
      index = results.length - 1
    } else {
      index = index - 1
    }

    const newResultsId = results[index]
    this.props.selectResult(newResultsId.id)
  }

  _closeDetails() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const {
      hideLoadMore,
      maxItems,
      results,
      isFetching,
      hasFailedFetching,
      searchedCategories,
      hardcodedCategories,
      selectedResult
    } = this.props

    const categories = hardcodedCategories ? hardcodedCategories : searchedCategories
    const resultsForCategory = _get(results, getCategoryKey(categories))

    if (resultsForCategory) {
        const hasResults = !!resultsForCategory.length
        const hasFiniteAmountOfResults = resultsForCategory.length % 20 === 0
        const trimmedResults = maxItems ? _take(resultsForCategory, maxItems) : resultsForCategory

        const selectedResultsIndex = getIndexOfResult(resultsForCategory, { id: selectedResult})

        return (
          <Flexbox flexWrap="wrap" className="ResultsContainer" maxWidth="100%">

            {/* loader */}
            { (isFetching && !hasResults) && showLoader() }

            {/* error */}
            { (hasFailedFetching) && showError() }

            {/* no results */}
            { (!hasFailedFetching && !hasResults && !isFetching) && showNoResultsMessage() }

            {/* errors fetching */}
            { (!hasFailedFetching) &&  showResults(trimmedResults, this._showProductDetails)}

            {/* results */}
            { (!hideLoadMore && hasResults && hasFiniteAmountOfResults ) && showLoadMore(this._fetchMoreResults)}

            {/* modal */}
            { (this.state.modalIsOpen) &&  (
              <DetailsModal
                id={this.props.selectedResult}
                selectedResultsIndex={selectedResultsIndex}
                amountOfItems={resultsForCategory.length}
                isOpened={this.state.modalIsOpen}
                close={this._closeDetails}
                next={this._showNextProductDetails}
                prev={this._showPrevProductDetails}
              />
            ) }

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
    hasFailedFetching: state.searchResults.hasFailedFetching,
    selectedResult: state.searchResults.selectedResult
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
    },
    selectResult: id => {
      dispatch(selectResult(id))
    }
  }
}

const Results = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer)

export default Results;
