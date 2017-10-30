import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Results from '../connected/Results'
import Search from '../connected/Search'
import Ages from '../connected/Ages'
import ResultsHeadline from '../connected/ResultsHeadline'
// import './ResultsPage.css'

class ResultsPage extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" maxWidth="100%" className="ResultsPageContainer" minHeight="80vh">

        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="">
            <Search />
        </Flexbox>

        <Ages />
        <ResultsHeadline showPrefixText={true} />
        <Results
          hideLoadMore={false}
          hideAgeRanges={false}
        />

      </Flexbox>
    )
  }
}

export default ResultsPage;
