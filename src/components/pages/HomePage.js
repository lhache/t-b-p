import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Search from '../containers/Search'
import CookieBannerBar from '../presentational/CookieBannerBar'
// import './HomePage.css'

class HomePage extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="HomePageContainer">
        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="">
            <Search />
        </Flexbox>
        <CookieBannerBar />
      </Flexbox>
    )
  }
}

export default HomePage;
