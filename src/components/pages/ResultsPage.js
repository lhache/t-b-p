import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Results from '../containers/Results'
import Search from '../containers/Search'
import Header from '../presentational/Header'
import Footer from '../presentational/Footer'
// import './ResultsPage.css'

class ResultsPage extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="ResultsPageContainer">
        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="HeaderBackground">
            <Header type="oneline" />
            <Search />
        </Flexbox>

        <Results />
        <Footer />
      </Flexbox>
    )
  }
}

export default ResultsPage;
