import React from 'react';
import Translate from 'react-translate-component'
import Flexbox from 'flexbox-react';
import ReactSVG from 'react-svg'
import TagAutocomplete from './TagAutocomplete'
import { isDeviceConsideredMobile } from '../../data/utils'
import iconSearch from '../../images/icon-search.svg'
import './SearchForm.css'

const showMobileSearchForm = (term, onChange) => {
  return (
    <Flexbox flexBasis="100%" flexWrap="wrap"  flexDirection="column" className="SearchFormContainer">
      <Flexbox flexBasis="100%" className="SearchInputContainer" order={1}>
        <TagAutocomplete
          value={term}
          onChange={onChange}
        />
      </Flexbox>
      <Flexbox flexBasis="100%" className="SearchButtonContainer" alignSelf="flex-end" order={2}>
        <button className="SearchButton" type="submit">
          <Translate content="search.search" />
        </button>
      </Flexbox>
    </Flexbox>
  )
}

const showDesktopSearchForm = (term, onChange) => {
  return (
    <Flexbox flexBasis="100%" flexWrap="wrap">
      <Flexbox flexBasis="100%">
        <Flexbox flexBasis="5%" className="SearchIconContainer">
          <Flexbox flexBasis="100%" alignSelf="center" justifyContent="center">
            <ReactSVG path={`${process.env.REACT_APP_ASSET_HOST}${iconSearch}`} />
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
    </Flexbox>
  )
}

const SearchForm = ({ term, onChange, onSubmit }) => {
  return (
    <Flexbox flexBasis="100%">
      <form
        className="SearchForm"
        onSubmit={e => {
          e.preventDefault()
          onSubmit(term)
        }} >
        {isDeviceConsideredMobile() ? showMobileSearchForm(term, onChange) : showDesktopSearchForm(term, onChange)}
      </form>
    </Flexbox>)
  }

export default SearchForm;
