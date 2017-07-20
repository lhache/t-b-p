import React, { Component } from 'react';
import Translate from 'react-translate-component'
import TagAutocomplete from './TagAutocomplete'
import TagInput from 'react-categorized-tag-input';
import Flexbox from 'flexbox-react';
import counterpart from 'counterpart'
import 'react-categorized-tag-input/categorized-tag-input.css';
import './SearchForm.css'



const SearchForm = ({ term, onChange, onSubmit }) => {
  let input
  const categories = [
    {
      id: 'general',
      type: 'toy type',
      title: ' ',
      items: [
        'sustainable',
        'wooden',
        'green toy',
        'educational',
        'maths',
        'development'
      ],
      single: false
    },
    {
      id: 'age',
      type: 'age type',
      title: 'Age group',
      items: [
        'all',
        '0-2 years old',
        '2-3 years old',
        '3-4 years old',
        '4-5 years old',
        '5-6 years old',
      ],
      single: false
    }
  ]
  // const values = [
  //   {
  //     title: "gen1",
  //     category: "general"
  //   }
  // ]

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

        <Flexbox flexBasis="100%">
          <Flexbox flexBasis="80%">
          {/* <input className="SearchInput" ref={node => { input = node}} value={term} /> */}
          <TagInput
            value={term}
            categories={categories}
            addNew={false}
            onChange={onChange}
            placeholder={counterpart("search.placeholder")}
          />
          </Flexbox>
          <Flexbox flexBasis="20%">
            <button className="SearchButton" type="submit">
              <Translate content="search.search" />
            </button>
          </Flexbox>
        </Flexbox>
        <Flexbox flexBasis="100%">
          <Translate className="SearchSubPlaceholder" content="search.formSubPlaceholder" />
        </Flexbox>

      </form>
    </Flexbox>)
  }



export default SearchForm;
