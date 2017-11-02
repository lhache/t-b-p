import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { buildUrl, joinTermToStringWithSymbol } from '../../utils/appUtils'
import counterpart from 'counterpart'
import VirtualizedSelect from 'react-virtualized-select'
import './TagAutocomplete.css'
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

class TagAutocompleteContainer extends Component {

  constructor(props) {
    super(props)
    this._getOptions = this._getOptions.bind(this)
  }

  _getOptions(input) {
    const url = buildUrl(
      `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_SUGGEST_ENDPOINT}`,
      {
        q: input,
        c: joinTermToStringWithSymbol(this.props.selectedCategories, 'name', ',')
      }
    )
    return fetch(url)
      .then((response) => response.json())
      .then((json) => ({ options: json }))
  }

  render () {
    const value = this.props.term ? this.props.term.split(',').map(t => ({id: t, name: t})) : []

    return (
      <VirtualizedSelect
        async
        multi={true}
        name="searchform-tags"
        loadOptions={this._getOptions}
        onChange={this.props.onChange}
        // onInputChange={this.props.onChange}
        value={value}
        placeholder={counterpart('search.placeholder')}
        loadingPlaceholder={counterpart('search.loadingPlaceholder')}
        noResultsText={counterpart('search.noResultsFound')}
        openOnFocus={true}
        autoBlur={true}
        autosize={true}
        maxHeight={1000}
        optionHeight={40}
        disabled={this.props.disabled}
        labelKey="name"
        valueKey="id"
        closeOnSelect={false}
        cache={false}
        // menuBuffer={1000}
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
    term: state.searchResults.term,
    selectedCategories: state.searchResults.selectedCategories
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
