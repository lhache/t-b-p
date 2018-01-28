import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Results from '../connected/Results'
import Search from '../connected/Search'
import Ages from '../connected/Ages'
import CookieBannerBar from '../presentational/CookieBannerBar'
// import './LandingPage.css'


class LandingPage extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="LandingPageContainer" minHeight="100vh">
          <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="" style={{display: 'none'}}>
              <Search />
          </Flexbox>

          <Ages />
          <Results hideLoadMore={false} />
        <CookieBannerBar />
      </Flexbox>
    )
  }
}

export default LandingPage;
