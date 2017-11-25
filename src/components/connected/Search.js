import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getShortenedLocale } from '../../data/translations/translations'
import SearchForm from '../presentational/SearchForm'
import Flexbox from 'flexbox-react';
import { storeTerm, storeSelectedCategories, storeSearchedCategories } from '../../data/modules/searchResults'
import { fetchSearchOptions } from '../../data/modules/searchOptions'
import { buildUrl } from '../../utils/appUtils'
import { resultsUrl } from '../../data/urls'
import { getOrCreateElementById } from '../../utils/domUtils'
import { joinTermToStringWithSymbol, getAppParam } from '../../utils/appUtils'
import './Search.css';

class SearchContainer extends Component {

  constructor(props) {
    super(props)
    this._fetchOptions = this._fetchOptions.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._handleChange = this._handleChange.bind(this)
  }

  componentWillMount() {
    // set selectedCategories and fetch results at page load
    const termFromUrl = getAppParam('c')
    if (termFromUrl) {
      const term = decodeURIComponent(termFromUrl)

      this.props.storeTerm(term)
      this.props.storeSearchedCategories(term.split(',').map(t => ({ name: t })))
      this.props.storeSelectedCategories(term.split(',').map(t => ({ name: t })))
    }
  }

  _fetchOptions(input) {
    return this.props.fetchSuggestOptions(input, this.props.selectedCategories)
  }

  _handleSubmit(term) {

    const urlParams = {
      c: term,
      age_from: this.props.age.age_from,
      age_until: this.props.age.age_until
    }

    this.props.history.push({
      // pathname: `${ resultsUrl }`,
      pathname: `/${getShortenedLocale()}${ resultsUrl }`,
      search: buildUrl('', urlParams),
      state: { term }
    })
  }

  _handleChange(categories) {
    const term = joinTermToStringWithSymbol(categories, 'name', ',')
    this.props.storeTerm(term)
    this.props.storeSelectedCategories(categories)
    // debugger
    // this.props.fetchSearchOptions(null, categories)
  }

  render() {
    return ReactDOM.createPortal(
      <Flexbox flexBasis="100%" flexWrap="wrap" className="SearchContainer fadeIn duration-500">
        <SearchForm
          term={this.props.term}
          selectedCategories={this.props.searchedCategories}
          fetchOptions={this._fetchOptions}
          onChange={this._handleChange}
          onSubmit={this._handleSubmit}
        />
      </Flexbox>,
      getOrCreateElementById('div', { id: 'SearchContainer'})
    )
  }
}

SearchContainer.propTypes = {
  term: PropTypes.string.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  searchedCategories: PropTypes.array.isRequired,
  storeTerm: PropTypes.func.isRequired,
  storeSelectedCategories: PropTypes.func.isRequired,
  storeSearchedCategories: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    age: state.searchResults.age,
    term: state.searchResults.term,
    selectedCategories: state.searchResults.selectedCategories,
    searchedCategories: state.searchResults.searchedCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSearchOptions: (term, categories) => {
      return dispatch(fetchSearchOptions(term, categories))
    },
    storeTerm: term => {
      return dispatch(storeTerm(term))
    },
    storeSelectedCategories: c => {
      return dispatch(storeSelectedCategories(c))
    },
    storeSearchedCategories: c => {
      return dispatch(storeSearchedCategories(c))
    },
  }
}

const Search = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer))

export default Search;
