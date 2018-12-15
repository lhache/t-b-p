import React, { Component } from 'react';
import { connect } from 'react-redux'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import Translate from 'react-translate-component'
import DetailsModal from '../presentational/DetailsModal'
import { storeTerm }  from '../../data/modules/term'
import { storeSelectedCategory }  from '../../data/modules/categories'
import { fetchResults, selectResult, resetResults }  from '../../data/modules/results'
import { getCategoryKey, getAppParam, buildCategoryObjectFromName, isDeviceConsideredMobile, isTablet } from '../../utils/appUtils'
import Loader from '../presentational/Loader'
import Product from '../presentational/Product'
import Flexbox from 'flexbox-react'
import _take from 'lodash/take'
import _get from 'lodash/get'
import _find from 'lodash/find'
import _isEmpty from 'lodash/isEmpty'
import { trackModalOpen, trackModalClose, trackModalPrevItem, trackModalNextItem } from '../../data/tracking'
import { getResults, decideWhichCategoryToUse } from '../../utils/appUtils'
import { Flex, Box } from '@ghostgroup/grid-styled'
import './Results.css'
import { ThemeProvider } from 'styled-components'
import styledTheme from '../../design-system/styled-theme'

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
  <ThemeProvider theme={styledTheme}>
    <Flex flexWrap="wrap" justifyContent="flex-start">
    {
        results.map((result, idx) => (
            <Box
              key={Math.random() + result.id}
              className=""
              px={ 2 }
              py={ 1 }
              width={[1, 1/2, 1/3, 1/5]}
            >
              <Product product={result} select={selectResult} />
            </Box>
        ))
    }
    </Flex>
  </ThemeProvider>

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
    const selectedCategory = this.props.hardcodedCategories ? this.props.hardcodedCategories : getAppParam('c') ? buildCategoryObjectFromName(getAppParam('c')) : null
    this.props.storeSelectedCategory(selectedCategory)
    this.props.fetchResults(getAppParam('q'), selectedCategory, this.props.age)
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
    const categories = decideWhichCategoryToUse(this.props.hardcodedCategories, this.props.selectedCategory)
    const results = getResults(this.props.results, categories)
    this.props.fetchResults(this.props.term, this.props.selectedCategory, this.props.age, results.length)
  }

  _showProductDetails(id) {
    debugger
    this.setState({
      modalIsOpen: true,
      resultIdForDetails: null
    })
    this.props.selectResult(id)
    trackModalOpen(id)
  }

  _showNextProductDetails() {
    const categories = decideWhichCategoryToUse(this.props.hardcodedCategories, this.props.selectedCategory)
    const results = getResults(this.props.results, categories)
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
    const categories = decideWhichCategoryToUse(this.props.hardcodedCategories, this.props.selectedCategory)
    const results = getResults(this.props.results, categories)
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
      selectedCategory,
      hardcodedCategories,
      selectedResult
    } = this.props

    const resultsCategories = decideWhichCategoryToUse(hardcodedCategories, selectedCategory)
    const displayedResults = getResults(results, resultsCategories)

    // debugger

    if (displayedResults) {
        const hasResults = !!displayedResults.length
        const hasFiniteAmountOfResults = displayedResults.length % 20 === 0
        const trimmedResults = maxItems ? _take(displayedResults, maxItems) : displayedResults

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
  storeSelectedCategory: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    term: state.term.term,
    age: state.ages.ages,
    term: state.term.term,
    categories: state.categories.categories,
    selectedCategory: state.categories.selectedCategory,
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
    storeSelectedCategory: term => {
      dispatch(storeSelectedCategory(term))
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
