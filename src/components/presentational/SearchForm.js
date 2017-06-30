import React, { Component } from 'react';

const SearchForm = ({ term, triggerSearch, dispatch }) => {
  let input

  return (
    <div>
      <div>
        searched term: {term}
      </div>

      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          triggerSearch(input.value)
          input.value = ''
        }}
      >
        <input ref={node => { input = node}}/>
        <button type="submit">Search</button>
      </form>
    </div>)
  }



export default SearchForm;
