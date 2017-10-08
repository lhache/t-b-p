import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Translate from 'react-translate-component'
import Flexbox from 'flexbox-react';
import ReactSVG from 'react-svg'
import TagAutocomplete from './TagAutocomplete'
import { isDeviceConsideredMobile } from '../../data/utils'
import { getOrCreateElementById } from '../../utils/domUtils'
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
            <ReactSVG path={`${process.env.REACT_APP_ASSET_HOST}/static/media/icon-search.svg`} />
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
    </Flexbox>
  )
}

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this._handleSumbit = this._handleSumbit.bind(this)
  }

  _handleSumbit(e) {
    e.preventDefault()
    this.props.onSubmit(this.props.term)
  }

  render() {
    const { term, onChange } = this.props
    return ReactDOM.createPortal(
      <Flexbox flexBasis="100%">
        <form className="SearchForm" onSubmit={this._handleSumbit}>
          {isDeviceConsideredMobile() ? showMobileSearchForm(term, onChange) : showDesktopSearchForm(term, onChange)}
        </form>
      </Flexbox>,
      getOrCreateElementById('div', { id: 'SearchContainer'})
    )
  }
}

export default SearchForm;
