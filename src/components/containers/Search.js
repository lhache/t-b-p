import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import SearchForm from '../presentational/SearchForm'
import TagAutocomplete from '../presentational/TagAutocomplete'
import Flexbox from 'flexbox-react';
import { storeTerm, storeSelectedTerms, fetchSuggestOptions } from '../../data/modules/searchResults'
import { Link } from 'react-router-dom'
import { isDeviceConsideredMobile } from '../../data/utils'
import { parseQueryString } from '../../data/utils'
import { searchUrl, resultsUrl } from '../../data/urls'
import { getOrCreateElementById } from '../../utils/domUtils'
import { joinTermToStringWithSymbol } from '../../utils/appUtils'
import _get from 'lodash/get'
import './Search.css';

const showMobileSearch = (props, that) => {
  if (/search/i.test(window.location.pathname)) {
    return (
      <SearchForm
        term={props.term}
        selectedTerms={props.selectedTerms}
        fetchOptions={that._fetchOptions}
        onChange={that._handleChange}
        onSubmit={that._handleSubmit}
      />
    )
  }
  else {
    return (
      <Link to={`${searchUrl}?q=${joinTermToStringWithSymbol(props.term, ',')}`} className="SearchLink">
        <TagAutocomplete
          term={props.term}
          selectedTerms={props.selectedTerms}
          fetchOptions={that._fetchOptions}
          onChange={that._handleChange}
          disabled={true}
        />
      </Link>
    )
  }
}

const showDesktopSearch = (props, that) => (
  <SearchForm
    term={props.term}
    selectedTerms={props.selectedTerms}
    fetchOptions={that._fetchOptions}
    onChange={that._handleChange}
    onSubmit={that._handleSubmit}
  />
)

class SearchContainer extends Component {

  constructor(props) {
    super(props)
    this._fetchOptions = this._fetchOptions.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._handleChange = this._handleChange.bind(this)
  }

  componentWillMount() {
    // set selectedTerms and fetch results at page load
    const termFromUrl = _get(parseQueryString(this.props.history.location.search), 'q')
    debugger
    if (termFromUrl) {
      const term = decodeURIComponent(termFromUrl)

      this.props.storeTerm(term)
      this.props.storeSelectedTerms(term.split(',').map(t => ({ name: t })))
    }
  }

  _fetchOptions(input) {
    // debugger;
    return this.props.fetchSuggestOptions(input, this.props.selectedTerms)
  }

  _handleSubmit(term) {
    this.props.history.push({
      pathname: `${ resultsUrl }`,
      search: `?q=${ term }`,
      state: { term }
    })
  }

  _handleChange(data) {
    const term = joinTermToStringWithSymbol(data, 'name', ',')
    this.props.storeTerm(term)
  }

  render() {
    return ReactDOM.createPortal(
      <Flexbox flexBasis="100%" flexWrap="wrap" className="SearchContainer">
        { isDeviceConsideredMobile() ?
          showMobileSearch(this.props, this) :
          showDesktopSearch(this.props, this)
        }
      </Flexbox>,
      getOrCreateElementById('div', { id: 'SearchContainer'})
    )
  }
}

SearchContainer.propTypes = {
  term: PropTypes.string.isRequired,
  selectedTerms: PropTypes.array.isRequired,
  storeTerm: PropTypes.func.isRequired,
  storeSelectedTerms: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    term: state.searchResults.term,
    selectedTerms: state.searchResults.selectedTerms
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSuggestOptions: term => (dispatch(fetchSuggestOptions(term))),
    storeTerm: term => {
      return dispatch(storeTerm(term))
    },
    storeSelectedTerms: term => {
      return dispatch(storeSelectedTerms(term))
    }
  }
}

const Search = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer))

export default Search;
