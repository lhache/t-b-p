import React, { Component } from 'react';
import counterpart from 'counterpart'
import VirtualizedSelect from 'react-virtualized-select'
import './TagAutocomplete.css'
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

const getOptions = input => {
  return fetch(`${process.env.REACT_APP_ASSET_HOST}/autocomplete.json?q=${input}`,{
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json'
  })
    .then((response) => response.json())
    .then((json) => ({ options: json.values }))
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
