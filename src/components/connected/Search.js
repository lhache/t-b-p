import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getShortenedLocale } from '../../data/translations/translations'
import SearchForm from '../presentational/SearchForm'
import Flexbox from 'flexbox-react';
import { storeTerm } from '../../data/modules/term'
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
    const termFromUrl = getAppParam('q')
    if (termFromUrl) {
      const term = decodeURIComponent(termFromUrl)

      this.props.storeTerm(term)
    }
  }

  _fetchOptions(input) {
    return this.props.fetchSuggestOptions(input, this.props.categories)
  }

  _handleSubmit(term) {

    const urlParams = {
      q: term,
      age_from: this.props.ages.age_from,
      age_until: this.props.ages.age_until
    }

    this.props.history.push({
      // pathname: `${ resultsUrl }`,
      pathname: `/${getShortenedLocale()}${ resultsUrl }`,
      search: buildUrl('', urlParams),
      state: { term }
    })
  }

  _handleChange(term) {
    this.props.storeTerm(term)
  }

  render() {
    return ReactDOM.createPortal(
      <Flexbox flexBasis="100%" flexWrap="wrap" className="SearchContainer fadeIn duration-500">
        <SearchForm
          term={this.props.term}
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
  storeTerm: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    ages: state.ages.ages,
    term: state.term.term,
    categories: state.categories.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeTerm: term => {
      return dispatch(storeTerm(term))
    }
  }
}

const Search = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer))

export default Search;
