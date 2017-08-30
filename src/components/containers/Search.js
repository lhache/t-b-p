import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import SearchForm from '../presentational/SearchForm'
import TagAutocomplete from '../presentational/TagAutocomplete'
import Flexbox from 'flexbox-react';
import { storeTerm, storeSearchedTerm } from '../../data/modules/searchResults'
import { Link } from 'react-router-dom'
import { isDeviceConsideredMobile } from '../../data/utils'

import './Search.css';

const showMobileSearch = (term, that) => {
  if (/search/i.test(window.location.pathname)) {
    return (
      <SearchForm
        term={term}
        onChange={that.handleChange.bind(that)}
        onSubmit={that.handleSubmit.bind(that)}
      />
    )
  }
  else {
    return (
      <Link to={`/search`} className="SearchLink">
        <TagAutocomplete
          value={term}
          onChange={that.handleChange.bind(that)}
          disabled={true}
        />
      </Link>
    )
  }
}

const showDesktopSearch = (term, that) => (
  <SearchForm
    term={term}
    onChange={that.handleChange.bind(that)}
    onSubmit={that.handleSubmit.bind(that)}
  />
)

class SearchContainer extends Component {


  handleSubmit(term) {
    const history = this.props.history;
    const termForURL = term.map(t => t.value).join(',')
    history.push({
      pathname: '/results',
      search: `?q=${termForURL}`,
      state: { term }
    })
  }

  handleChange(term) {
    this.props.storeTerm(term)
  }

  render() {
    const {term} = this.props

    return (
      <Flexbox flexBasis="100%" flexWrap="wrap" className="SearchContainer">
        { isDeviceConsideredMobile() ? showMobileSearch(term, this) : showDesktopSearch(term, this)}
      </Flexbox>
    )
  }
}

SearchContainer.propTypes = {
  term: PropTypes.array.isRequired,
  storeTerm: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    term: state.searchResults.term
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeTerm: term => {
      dispatch(storeTerm(term))
    },
    storeSearchedTerm: term => {
      dispatch(storeSearchedTerm(term))
    }
  }
}

const Search = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer))

export default Search;
