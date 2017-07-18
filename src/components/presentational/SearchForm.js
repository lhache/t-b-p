import React, { Component } from 'react';
import TagAutocomplete from './TagAutocomplete'
import ReactTags from 'react-tag-autocomplete'
import Flexbox from 'flexbox-react';
import './SearchForm.css'

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
    <Flexbox flexBasis="100%">
      <Flexbox>
        {/* searched term: {term} */}
      </Flexbox>

      <form
        className="SearchForm"
        onSubmit={e => {
          e.preventDefault()
          onSubmit(term)
        }}

        onChange={e => {
          onChange(e.target.value)
        }}
      >
        {/* <Flexbox>
          <ReactTags
            placeholder="Search for toys"
            tags={term}
            suggestions={suggestions}
            handleDelete={this.handleDelete.bind(this)}
            handleAddition={this.handleAddition.bind(this)}
            minQueryLength={1}
          />
        </Flexbox> */}
        <Flexbox flexBasis="100%">
          <Flexbox flexBasis="90%">
          <input className="SearchInput" ref={node => { input = node}} value={term} />
          </Flexbox>
          <Flexbox flexBasis="10%">
            <button type="submit">Search</button>
          </Flexbox>
        </Flexbox>

      </form>
    </Flexbox>)
  }



export default SearchForm;
