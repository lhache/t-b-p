import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Search from '../containers/Search'
import Results from '../containers/Results'
import Header from '../presentational/Header'
import Footer from '../presentational/Footer'
import USP from '../presentational/USP'
// import './SearchPage.css'


class SearchPage extends Component {
  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="SearchPageContainer" height="100vh">
        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="HeaderBackground">
          <Search />
        </Flexbox>
      </Flexbox>
    )
  }
}

export default SearchPage;
