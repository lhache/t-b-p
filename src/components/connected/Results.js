import React, { Component } from 'react';
import { connect } from 'react-redux'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import Translate from 'react-translate-component'
import DetailsModal from '../presentational/DetailsModal'
import { storeTerm }  from '../../data/modules/term'
import { storeCategories }  from '../../data/modules/categories'
import { fetchResults, selectResult, resetResults }  from '../../data/modules/results'
import { getCategoryKey } from '../../utils/appUtils'
import Loader from '../presentational/Loader'
import Product from '../presentational/Product'
import Flexbox from 'flexbox-react'
import _take from 'lodash/take'
import _get from 'lodash/get'
import _find from 'lodash/find'
import _isEmpty from 'lodash/isEmpty'
import { trackModalOpen, trackModalClose, trackModalPrevItem, trackModalNextItem } from '../../data/tracking'
import { getResults } from '../../utils/appUtils'
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
    // but update when modal is opening
    if (this.state.modalIsOpen !== nextState.modalIsOpen) {
      return true
    }

    if (this.props.hardcodedCategories) {
      if (this.props.results[getCategoryKey(this.props.hardcodedCategories)] !== nextProps.results[getCategoryKey(this.props.hardcodedCategories)]) {
        return true
      }
      else {
        return false
      }
    }
    else {
      if (!_isEmpty(nextProps.results)) {
        return this.props.results[this.props.term] === nextProps.results[nextProps.term]
      }
      else {
        return false
      }
    }
  }

  _fetchMoreResults() {
    const results = getResults(this.props.results, getCategoryKey(this.props.selectedCategories)) 
    this.props.fetchResults(this.props.term, this.props.selectedCategories, this.props.age, results.length)
  }

  _showProductDetails(id) {
    this.setState({
      modalIsOpen: true,
      resultIdForDetails: id
    })
    this.props.selectResult(id)
    // this.props.resetResults()
    trackModalOpen(id)
  }

  _showNextProductDetails() {
    const category = this.props.hardcodedCategories ? this.props.hardcodedCategories : this.props.selectedCategories
    const results = _get(this.props.results, getCategoryKey(category)) 
    const res = _find(results, { id: this.props.selectedResult})
    let index = results.indexOf(res)

    if (index === results.length - 1) {
      index = 0
    } else {
      index = index + 1
    }

    const newRes = results[index]

    trackModalNextItem(this.state.resultIdForDetails, newRes.id)
    this.props.selectResult(newRes.id)
  }

  _showPrevProductDetails() {
    const category = this.props.hardcodedCategories ? this.props.hardcodedCategories : this.props.selectedCategories
    const results = _get(this.props.results, getCategoryKey(category)) 
    const res = _find(results, { id: this.props.selectedResult})
    let index = results.indexOf(res)

    if (index === 0) {
      index = results.length - 1
    } else {
      index = index - 1
    }

    const newRes = results[index]

    trackModalPrevItem(this.state.resultIdForDetails, newRes.id)
    this.props.selectResult(newRes.id)
  }

  _closeDetails() {
    this.setState({modalIsOpen: false});
    trackModalClose(this.state.resultIdForDetails)
  }

  render() {
    const {
      term,
      hideLoadMore,
      maxItems,
      results,
      isFetching,
      hasFailedFetching,
      selectedCategories,
      hardcodedCategories,
      selectedResult
    } = this.props

    const resultsCategories = hardcodedCategories ? hardcodedCategories : selectedCategories
    const displayedResults = getResults(results, resultsCategories) 
    console.log('hardcodedCategories', hardcodedCategories)
    console.log('selectedCategories ', selectedCategories  )
    console.log('resultsCategories', resultsCategories)
    console.log('results', results)
    console.log('displayedResults', displayedResults)

    if (displayedResults) {
        const hasResults = !!displayedResults.length
        const hasFiniteAmountOfResults = displayedResults.length % 20 === 0
        const trimmedResults = maxItems ? _take(displayedResults, maxItems) : displayedResults
        // debugger

        const selectedResultsIndex = getIndexOfResult(displayedResults, { id: selectedResult})

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
                amountOfItems={displayedResults.length}
                isOpened={this.state.modalIsOpen}
                close={this._closeDetails}
                next={this._showNextProductDetails}
                prev={this._showPrevProductDetails}
                onImageLoad={this._onDetailsImageLoad}
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
  categories : PropTypes.array.isRequired,
  age : PropTypes.object.isRequired,
  results: PropTypes.object.isRequired,
  storeTerm: PropTypes.func.isRequired,
  storeCategories: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    term: state.term.term,
    age: state.ages.ages,
    term: state.term.term,
    categories: state.categories.categories,
    selectedCategories: state.categories.selectedCategories,
    results: state.results.results,
    isFetching: state.results.isFetching,
    hasFailedFetching: state.results.hasFailedFetching,
    selectedResult: state.results.selectedResult
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeTerm: term => {
      dispatch(storeTerm(term))
    },
    storeCategories: term => {
      dispatch(storeCategories(term))
    },
    fetchResults: (term, categories, age, offset) => {
      dispatch(fetchResults(term, categories, age, offset))
    },
    selectResult: id => {
      dispatch(selectResult(id))
    },
    resetResults: () => {
      dispatch(resetResults())
    }
  }
}

const Results = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer)

export default Results;
