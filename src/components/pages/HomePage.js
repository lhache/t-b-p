import React, { Component } from 'react'
import Flexbox from 'flexbox-react'
import Translate from 'react-translate-component'
import Results from '../connected/Results'
import Details from '../connected/Details'
import Search from '../connected/Search'
import Ages from '../connected/Ages'
import Categories from '../connected/Categories'
import ResultsHeadline from '../connected/ResultsHeadline'
import CookieBannerBar from '../presentational/CookieBannerBar'
import Filter from '../presentational/Filter'
import { isDeviceConsideredMobile } from '../../utils/appUtils'
import { Div } from 'glamorous'

class HomePage extends Component {

  render() {

    const hardcodedCategories = [
      [{name: 'Puzzles'}],
      [{name: 'Spiele'}]
    ]

    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="HomePageContainer" minHeight="90vh">
        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="">
            <Search />
        </Flexbox>

        {/* { hardcodedCategories.map(c => (
          <Flexbox key={Math.random()} flexWrap="wrap" minHeight="325px" flexBasis="100%">
            <ResultsHeadline hardcodedTerms={c} showPrefixText={false} />
            <Results
              key={`res-${Math.random()}`}
              hideLoadMore={true}
              hideAgeRanges={false}
              maxItems={5}
              hardcodedCategories={c}
              searchedCategories={c}
              freezeUpdate={true}
            />
          </Flexbox>
        ))} */}

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

        <Div marginTop="20px">
          <Details />                
        </Div>             
        
        { !isDeviceConsideredMobile() && <ResultsHeadline showPrefixText={false} /> }
        <Results hideLoadMore={false} />

        <CookieBannerBar />
      </Flexbox>
    )
  }
}

export default HomePage;
