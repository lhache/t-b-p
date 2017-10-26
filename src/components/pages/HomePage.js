import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Search from '../containers/Search'
import Results from '../containers/Results'
import CookieBannerBar from '../presentational/CookieBannerBar'
// import './HomePage.css'

class HomePage extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="HomePageContainer" minHeight="90vh">
        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="">
            <Search />
        </Flexbox>

        <Results
          key="res1"
          hideLoadMore={true}
          hideAgeRanges={true}
          maxItems={5}
          hardcodedCategory={[{name: 'Spielzeug'}]}
        />
        <Results
          key="res2"
          hideLoadMore={true}
          hideAgeRanges={true}
          maxItems={5}
          hardcodedCategory={[{name: 'Bausteine'}]}
        />
        <Results
          key="res3"
          hideLoadMore={true}
          hideAgeRanges={true}
          maxItems={5}
          hardcodedCategory={[{name: 'LEGO'}]}
        />

        <CookieBannerBar />
      </Flexbox>
    )
  }
}

export default HomePage;
