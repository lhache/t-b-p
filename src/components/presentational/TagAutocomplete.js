import React, { Component } from 'react';
import { buildUrl } from '../../data/utils'
import counterpart from 'counterpart'
import VirtualizedSelect from 'react-virtualized-select'
import './TagAutocomplete.css'
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

const getOptions = input => {
  const url = buildUrl(
    `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_SUGGEST_ENDPOINT}`,
    { q: input }
  )
  return fetch(url)
    .then((response) => response.json())
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

export default TagAutocomplete
