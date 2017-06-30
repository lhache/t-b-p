import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Search.css';
import SearchForm from '../presentational/SearchForm'
import {triggerSearch} from '../../data/search/search'

const SearchContainer = ({ term, triggerSearch }) => (
  <div className="SearchContainer">
    <SearchForm
      term={term}
      triggerSearch={triggerSearch}
    />
  </div>
)

SearchContainer.propTypes = {
  term: PropTypes.string.isRequired,
  triggerSearch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    term: state.search.term
  }
}

const mapDispatchToProps = dispatch => {
  return {
    triggerSearch: term => {
      dispatch(triggerSearch(term))
    }
  }
}

const Search = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer))

export default Search;
