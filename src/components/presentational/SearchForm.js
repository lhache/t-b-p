import React from 'react';
import Translate from 'react-translate-component'
import Flexbox from 'flexbox-react';
import ReactSVG from 'react-svg'
import counterpart from 'counterpart'
import TagAutocomplete from './TagAutocomplete'
import './SearchForm.css'
import iconSearch from '../../images/icon-search.svg'

const SearchForm = ({ term, onChange, onSubmit }) => {

  return (
    <Flexbox flexBasis="100%">
      <form
        className="SearchForm"
        onSubmit={e => {
          e.preventDefault()
          onSubmit(term)
        }}
      >

        <Flexbox flexBasis="100%">
          <Flexbox flexBasis="5%" className="SearchIconContainer">
            <Flexbox flexBasis="100%" alignSelf="center" justifyContent="center">
              <ReactSVG path={iconSearch} />
            </Flexbox>
          </Flexbox>
          <Flexbox flexBasis="75%">
            <TagAutocomplete
              value={term}
              onChange={onChange}
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
