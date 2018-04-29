import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { buildUrl, getCategoryKey } from '../../utils/appUtils'
import counterpart from 'counterpart'
import VirtualizedSelect from 'react-virtualized-select'
import './TagAutocomplete.css'
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import _isArray from 'lodash/isArray'
import _truncate from 'lodash/truncate'

class TagAutocompleteContainer extends Component {

  constructor(props) {
    super(props)
    this._getOptions = this._getOptions.bind(this)
    this._onChange = this._onChange.bind(this)
    this._onInputChange = this._onInputChange.bind(this)
  }

  _getOptions(input) {

      let queryParams = {}

      if(!_isArray(input)) {
        if (input) {
            queryParams = Object.assign({}, queryParams, {q: input})
        }
      }
      
      const url = buildUrl(
        `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_SUGGEST_ENDPOINT}`,
        queryParams
      )


      return fetch(url)
        .then((response) => {
          return response.json()
        })
        .then((json) => ({ options: json }))
  }

  // this is when the value of the input changes
  _onInputChange(e) {
    e !== "" && this.props.onChange(e)
  }

  // this is when selecting a product in the list
  _onChange(item) {
    this.props.onSelectItem(item)
  }

  render () {
    // const value = this.props.term ? this.props.term.split(',').map(t => ({id: t, name: t})) : []

    return (
        <VirtualizedSelect
        async
        multi={false}
        name="searchform-tags"
        loadOptions={this._getOptions}
        onChange={this._onChange}
        onInputChange={this._onInputChange}
        value={this.props.term}
        placeholder={counterpart('search.placeholder')}
        loadingPlaceholder={counterpart('search.loadingPlaceholder')}
        noResultsText={counterpart('search.noResultsFound')}
        openOnFocus={true}
        autoBlur={false}
        onBlurResetsInput={false}
        autosize={true}
        maxHeight={1000}
        optionHeight={40}
        disabled={this.props.disabled}
        labelKey="name"
        valueKey="id"
        closeOnSelect={false}
        cache={false}
      />
    )
  }
}


TagAutocompleteContainer.propTypes = {
  term: PropTypes.string.isRequired,
  selectedCategories: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    term: state.term.term,
    selectedCategories: state.categories.selectedCategories
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     storeAge: age => dispatch(storeAge(age)),
//     fetchResults: (term, categories, offset) => dispatch(fetchResults(term, categories, offset)),
//     resetResults: () => dispatch(resetResults())
//   }
// }

const TagAutocomplete = withRouter(connect(mapStateToProps)(TagAutocompleteContainer))

export default TagAutocomplete;
