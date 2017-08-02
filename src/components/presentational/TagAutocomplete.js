import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './TagAutocomplete.css'

const getOptions = input => {
  return fetch(`/autocomplete.json?q=${input}`)
    .then((response) => response.json())
    .then((json) => ({ options: json.values }))
}

class TagAutocomplete extends Component {
  render () {
    return (
      <Select.Async
        name="searchform-tags"
        value={this.props.value}
        openOnFocus={true}
        loadOptions={getOptions}
        onChange={this.props.onChange}
        multi={true}
        autosize={true}
        autoBlur={true}
        // autofocus={true}
        // simpleValue
      />
    )
  }
}

export default TagAutocomplete
