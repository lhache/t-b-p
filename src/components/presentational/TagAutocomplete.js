import React, { Component } from 'react';
import { buildUrl } from '../../data/utils'
import counterpart from 'counterpart'
import VirtualizedSelect from 'react-virtualized-select'
import { joinTermToStringWithSymbol } from '../../utils/appUtils'
import { parseQueryString } from '../../data/utils'
import _get from 'lodash/get'
import { fetchSuggestOptions } from '../../data/modules/searchResults'
import './TagAutocomplete.css'
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

const getOptions = input => {

  // TODO remove this when API fixed

  const url = buildUrl(
    `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_SUGGEST_ENDPOINT}`,
    { q: input }
  )
  return fetch(url)
    .then((response) => response.json())
    // .then((json) => (json.map(r => Object.assign({}, r, {value: r.id, label: r.name}))))
    .then((json) => ({ options: json }))
}

class TagAutocomplete extends Component {

  render () {
    const value = this.props.term ? this.props.term.split(',').map(t => ({id: t, name: t})) : []

    return (
      <VirtualizedSelect
        async
        multi={true}
        name="searchform-tags"
        loadOptions={getOptions}
        onChange={this.props.onChange}
        // onInputChange={this.props.onChange}
        value={value}
        placeholder={counterpart('search.placeholder')}
        openOnFocus={true}
        autoBlur={true}
        autosize={true}
        noResultsText={counterpart('search.noResultsFound')}
        maxHeight={1000}
        optionHeight={40}
        disabled={this.props.disabled}
        labelKey="name"
        valueKey="id"
        closeOnSelect={false}
        cache={false}
        // menuBuffer={1000}
      />
      // <Select.Async
      //   name="searchform-tags"
      //   value={this.props.value}
      //   openOnFocus={true}
      //   loadOptions={getOptions}
      //   onChange={this.props.onChange}
      //   multi={true}
      //   autosize={true}
      //   autoBlur={true}
      //   placeholder={counterpart('search.placeholder')}
      //   // autofocus={true}
      //   // simpleValue
      // />
    )
  }
}

export default TagAutocomplete
