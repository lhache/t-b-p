import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Results from '../containers/Results'
import Search from '../containers/Search'
// import './ResultsPage.css'

class ResultsPage extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" maxWidth="100%" className="ResultsPageContainer">
        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="">
            <Search />
        </Flexbox>

        <Results />
      </Flexbox>
    )
  }
}

export default ResultsPage;
