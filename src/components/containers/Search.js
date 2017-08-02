import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import SearchForm from '../presentational/SearchForm'
import Flexbox from 'flexbox-react';
import { storeTerm, storeSearchedTerm } from '../../data/modules/searchResults'
import _isArray from 'lodash/isArray'
import './Search.css';

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
        <SearchForm
          term={term}
          onChange={this.handleChange.bind(this)}
          onSubmit={this.handleSubmit.bind(this)}
        />
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
