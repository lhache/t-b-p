import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Results from '../connected/Results'
import Search from '../connected/Search'
import Ages from '../connected/Ages'
import Categories from '../connected/Categories'
import ResultsHeadline from '../connected/ResultsHeadline'
import Filter from '../presentational/Filter'
import { isDeviceConsideredMobile } from '../../utils/appUtils'
// import './ResultsPage.css'

class ResultsPage extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" maxWidth="100%" className="ResultsPageContainer">

        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="">
            <Search />
        </Flexbox>

        { 
          isDeviceConsideredMobile() ? 
          <Filter /> :
          (
            <div>
              <Ages />
              <Categories />
            </div>
          )
        }
        
        { !isDeviceConsideredMobile() && <ResultsHeadline showPrefixText={true} /> }
        <Results hideLoadMore={false} />

      </Flexbox>
    )
  }
}

export default ResultsPage;
