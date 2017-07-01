import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Search.css';
import SearchForm from '../presentational/SearchForm'
import {triggerSearch} from '../../data/search/search'


class SearchContainer extends Component {


  handleSubmit() {
    const history = this.props.history;
    history.push(`/results?q=${this.props.term}`)
  }

  handleChange(term) {
    this.props.triggerSearch(term)
  }

  render() {
    const {term, triggerSearch} = this.props

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
