import React, { Component } from 'react';
import TagAutocomplete from './TagAutocomplete'

const SearchForm = ({ term, triggerSearch, props }) => {
  let input
debugger;
  return (
    <div>
      <div>
        searched term: {term}
      </div>

      <form
        onSubmit={e => {
          // e.preventDefault()
          // if (!input.value.trim()) {
          //   return
          // }
          triggerSearch(input.value)
          // input.value = ''
        }}
      >
        <div>
          <TagAutocomplete />
        </div>

        <input ref={node => { input = node}}/>
        <button type="submit">Search</button>
      </form>
    </div>)
  }



export default SearchForm;
