import React, { Component } from 'react'
import Flexbox from 'flexbox-react'
import Translate from 'react-translate-component'
import Results from '../connected/Results'
import Details from '../connected/Details'
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
              <Translate content="categories.title" component="h3"/>
              <Categories />
              <Translate content="age.title" component="h3"/>
              <Ages />
            </div>
          )
        }

        <Details />
        
        {/* { !isDeviceConsideredMobile() && <ResultsHeadline showPrefixText={true} /> } */}
        <Results hideLoadMore={false} />

      </Flexbox>
    )
  }
}

export default ResultsPage;
