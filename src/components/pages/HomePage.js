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
      [{name: 'Bausteine'}],
      [{name: 'Puzzles'}],
      [{name: 'LEGO'}],
    ]

    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="HomePageContainer" minHeight="90vh">
        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="">
            <Search />
        </Flexbox>

        { hardcodedCategories.map(c => (
          <section key={Math.random()}>
            <ResultsHeadline hardcodedTerms={c} showPrefixText={false} />
            <Results
              key="res1"
              hideLoadMore={true}
              hideAgeRanges={true}
              maxItems={5}
              hardcodedCategory={c}
            />
          </section>
        ))}

        <CookieBannerBar />
      </Flexbox>
    )
  }
}

export default HomePage;
