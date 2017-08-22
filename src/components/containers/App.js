import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import DetailsPage from '../pages/DetailsPage'
import HomePage from '../pages/HomePage'
import SearchPage from '../pages/SearchPage'
import ResultsPage from '../pages/ResultsPage'
import LandingPage from '../pages/LandingPage'
import AboutUsPage from '../pages/static/AboutUsPage'
import ImprintPage from '../pages/static/ImprintPage'
import PrivacyPolicyPage from '../pages/static/PrivacyPolicyPage'
import AffiliateDisclaimerPage from '../pages/static/AffiliateDisclaimerPage'
import Flexbox from 'flexbox-react';
import { isDeviceConsideredMobile } from '../../data/utils'

class App extends Component {
  render() {
    const deviceTypeClass = isDeviceConsideredMobile() ? 'Mobile' : 'Desktop';

    return (
      <Flexbox flex="flex" flexDirection="row" flexWrap="wrap" className={`App App${deviceTypeClass}`}>
        {/* app logic pages  */}
        <Route exact path="/" component={HomePage} />
        <Route path="/results" component={ResultsPage}/>
        <Route path="/details/:id" component={DetailsPage}/>
        <Route path="/landing" component={LandingPage}/>

        {/* mobile search page */}
        <Route path="/search" component={SearchPage}/>

        {/* static pages */}
        <Route path="/about" component={AboutUsPage}/>
        <Route path="/imprint" component={ImprintPage}/>
        <Route path="/privacy-policy" component={PrivacyPolicyPage}/>
        <Route path="/affiliate-disclaimer" component={AffiliateDisclaimerPage}/>
      </Flexbox>
    );
  }
}

export default App;
