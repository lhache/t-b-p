import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Results from '../connected/Results'
import Search from '../connected/Search'
import Ages from '../connected/Ages'
import Categories from '../connected/Categories'
import ResultsHeadline from '../connected/ResultsHeadline'
import Filter from '../presentational/Filter'
import { isDeviceConsideredMobile } from '../../utils/appUtils'
import CookieBannerBar from '../presentational/CookieBannerBar'
import Translate from 'react-translate-component'
// import './LandingPage.css'


class LandingPage extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="LandingPageContainer" minHeight="100vh">
          <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="" style={{display: 'none'}}>
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

          { !isDeviceConsideredMobile() && <ResultsHeadline showPrefixText={false} /> }
          <Results hideLoadMore={false} />
        <CookieBannerBar />
      </Flexbox>
    )
  }
}

export default LandingPage;
