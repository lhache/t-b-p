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
    return (
      <VirtualizedSelect
        async
        multi={true}
        name="searchform-tags"
        loadOptions={getOptions}
        onChange={this.props.onChange}
        value={this.props.value}
        placeholder={counterpart('search.placeholder')}
        openOnFocus={true}
        autoBlur={true}
        autosize={true}
        noResultsText="TODO"
        maxHeight={1000}
        optionHeight={40}
        disabled={this.props.disabled}
        labelKey="name"
        valueKey="name"
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
