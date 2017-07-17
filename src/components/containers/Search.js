import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Search.css';
import SearchForm from '../presentational/SearchForm'
import { storeTerm, storeSearchedTerm } from '../../data/modules/searchResults'


class SearchContainer extends Component {


  handleSubmit(term) {
    const history = this.props.history;
    history.push({
      pathname: '/results',
      search: `?q=${term}`,
      state: { term }
    })
  }

  handleChange(term) {
    this.props.storeTerm(term)
  }

  render() {
    const {term} = this.props

    return (
      <div className="SearchContainer">
        <SearchForm
          term={term}
          onChange={this.handleChange.bind(this)}
          onSubmit={this.handleSubmit.bind(this)}
        />
      </div>
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
