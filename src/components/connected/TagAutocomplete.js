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
        // queryParams = Object.assign({}, queryParams, {c: getCategoryKey(this.props.selectedCategories)})
      }
      else {
        // queryParams = Object.assign({}, queryParams, {c: getCategoryKey(input)})
      }

      const url = buildUrl(
        `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_SUGGEST_ENDPOINT}`,
        queryParams
      )
      return fetch(url)
        .then((response) => {
          return response.json()
        })
        // .then((json) => ({ options: json }))
        .then((json) => ({ options: [
          {
            id: "14",
            name: "Kosmos 620813 - Elektro Profi",
            price: {
            priceInCents: 9490,
            displayPrice: "94,90 €"
            },
            imageUrls: {
            medium: [
            "https://images-eu.ssl-images-amazon.com/images/I/61%2Bn3aKZTAL._SL160_.jpg",
            "https://images-eu.ssl-images-amazon.com/images/I/51VILRCcadL._SL160_.jpg",
            "https://images-eu.ssl-images-amazon.com/images/I/41hrTkvwF0L._SL160_.jpg",
            "https://images-eu.ssl-images-amazon.com/images/I/613j8BoHc5L._SL160_.jpg"
            ]
            },
            deeplinkUrl: "https://api.thebetterplay.com/deeplink/14"
            },
            {
            id: "50",
            name: "KOSMOS 606022 - Mein erstes Forscher-Set",
            price: {
            priceInCents: 3499,
            displayPrice: "34,99 €"
            },
            imageUrls: {
            medium: [
            "https://images-eu.ssl-images-amazon.com/images/I/51YNWepHEUL._SL160_.jpg",
            "https://images-eu.ssl-images-amazon.com/images/I/41FLilTDdNL._SL160_.jpg",
            "https://images-eu.ssl-images-amazon.com/images/I/51dg-NO-S4L._SL160_.jpg"
            ]
            },
            deeplinkUrl: "https://api.thebetterplay.com/deeplink/50"
            }
        ] }))
  }

  // this is when the value of the input changes
  _onInputChange(e) {
    this.props.onChange(e)
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
