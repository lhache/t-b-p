import React, { Component } from 'react';
import TagAutocomplete from './TagAutocomplete'
import ReactTags from 'react-tag-autocomplete'

const suggestions = [
  { name: "Green toy" },
  { name: "Sustainable" },
  { name: "Educational" },
  { name: "For 3 years old" },
  { name: "For 4 years old" },
  { name: "For 5 years old" }
]

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
          onSubmit(term)
        }}

        onChange={e => {
          onChange(e.target.value)
        }}
      >
        {/* <div>
          <ReactTags
            placeholder="Search for toys"
            tags={term}
            suggestions={suggestions}
            handleDelete={this.handleDelete.bind(this)}
            handleAddition={this.handleAddition.bind(this)}
            minQueryLength={1}
          />
        </div> */}

        <input ref={node => { input = node}} value={term} />
        <button type="submit">Search</button>
      </form>
    </div>)
  }



export default SearchForm;
