import React, { Component } from 'react';
import TagAutocomplete from './TagAutocomplete'

const SearchForm = ({ term, onChange, onSubmit }) => {
  let input

  return (
    <div>
      <div>
        searched term: {term}
      </div>

      <form
        onSubmit={e => {
          e.preventDefault()
          onSubmit()
        }}

        onChange={e => {
          onChange(e.target.value)
        }}
      >
        <div>
          {/* <TagAutocomplete /> */}
        </div>

        <input ref={node => { input = node}} value={term} />
        <button type="submit">Search</button>
      </form>
    </div>)
  }



export default SearchForm;
