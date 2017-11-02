import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Search from '../connected/Search'
import Results from '../connected/Results'
import CookieBannerBar from '../presentational/CookieBannerBar'
import ResultsHeadline from '../connected/ResultsHeadline'
// import './HomePage.css'

class HomePage extends Component {

  render() {

    const hardcodedCategories = [
      [{name: 'Spielzeug'}],
      [{name: 'Holzpuzzles'}],
      [{name: 'Marken'}]
    ]

    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="HomePageContainer" minHeight="90vh">
        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="">
            <Search />
        </Flexbox>

        { hardcodedCategories.map(c => (
          <Flexbox key={Math.random()} flexWrap="wrap" minHeight="325px" flexBasis="100%">
            <ResultsHeadline hardcodedTerms={c} showPrefixText={false} />
            <Results
              key={`res-${Math.random()}`}
              hideLoadMore={true}
              hideAgeRanges={true}
              maxItems={5}
              hardcodedCategories={c}
              searchedCategories={c}
              freezeUpdate={true}
            />
          </Flexbox>
        ))}

        <CookieBannerBar />
      </Flexbox>
    )
  }
}

export default HomePage;
