import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Results from '../containers/Results'
import Search from '../containers/Search'
import Header from '../presentational/Header'
// import Footer from '../presentational/Footer'
import USP from '../presentational/USP'
import CookieBannerBar from '../presentational/CookieBannerBar'
// import './LandingPage.css'


class LandingPage extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="LandingPageContainer">
        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="HeaderBackground">
            <Header />
            <Search />
            <USP />
        </Flexbox>

        <Results />
        {/* <Footer /> */}
        <CookieBannerBar />
      </Flexbox>
    )
  }
}

export default LandingPage;
