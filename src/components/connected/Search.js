import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import SearchForm from '../presentational/SearchForm'
import Flexbox from 'flexbox-react';
import { storeTerm } from '../../data/modules/term'
import { getOrCreateElementById } from '../../utils/domUtils'
import { joinTermToStringWithSymbol, getAppParam } from '../../utils/appUtils'
import { routeToResultsForProduct, routeToResultsForTerm } from '../../data/routing'
import './Search.css';

class SearchContainer extends Component {

  constructor(props) {
    super(props)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._handleChange = this._handleChange.bind(this)
    this._handleSelectProduct = this._handleSelectProduct.bind(this)
  }

  componentWillMount() {
    const termFromUrl = getAppParam('q')
    if (termFromUrl) {
      const term = decodeURIComponent(termFromUrl)

      this.props.storeTerm(term)
    }
  }

  _handleChange(term) {
    this.props.storeTerm(term)
  }

  // on submit, do a general search for a term
  _handleSubmit(term) {
    this.props.history.push(routeToResultsForTerm(term, this.props.selectedCategory, this.props.ages))
  }

  _handleSelectProduct(product) {
    this.props.history.push(routeToResultsForProduct(product.id, this.props.term, product.category, this.props.ages))
  }

  render() {
    return ReactDOM.createPortal(
      <Flexbox flexBasis="100%" flexWrap="wrap" className="SearchContainer fadeIn duration-500">
        <SearchForm
          term={this.props.term}
          onChange={this._handleChange}
          onSelect={this._handleSelectProduct}
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
    categories: state.categories.categories,
    selectedCategory: state.categories.selectedCategory
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
