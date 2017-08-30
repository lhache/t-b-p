import React, { Component } from 'react';
import Select from 'react-select';
import counterpart from 'counterpart'
import VirtualizedSelect from 'react-virtualized-select'
import './TagAutocomplete.css'
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

const getOptions = input => {
  return fetch(`/autocomplete.json?q=${input}`)
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
