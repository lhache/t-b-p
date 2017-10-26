import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Results from '../containers/Results'
import Search from '../containers/Search'
import CookieBannerBar from '../presentational/CookieBannerBar'
// import './LandingPage.css'


class LandingPage extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="LandingPageContainer">
          <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="">
              <Search />
          </Flexbox>

          <Results
            hideLoadMore={false}
            hideAgeRanges={true}
          />
        <CookieBannerBar />
      </Flexbox>
    )
  }
}

export default LandingPage;
