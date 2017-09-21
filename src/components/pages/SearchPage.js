import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Search from '../containers/Search'
// import './SearchPage.css'

class SearchPage extends Component {
  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="SearchPageContainer" height="100vh">
          <Search />
      </Flexbox>
    )
  }
}

export default SearchPage;
