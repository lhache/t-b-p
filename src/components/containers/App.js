import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SearchPage from '../pages/SearchPage'
import ResultsPage from '../pages/ResultsPage'
import DetailsPage from '../pages/DetailsPage'
import LandingPage from '../pages/LandingPage'
import ContactPage from '../pages/static/ContactPage'
// import AboutUsPage from '../pages/static/AboutUsPage'
// import ImprintPage from '../pages/static/ImprintPage'
// import PrivacyPolicyPage from '../pages/static/PrivacyPolicyPage'
// import AffiliateDisclaimerPage from '../pages/static/AffiliateDisclaimerPage'
import Flexbox from 'flexbox-react';
import { isDeviceConsideredMobile } from '../../data/utils'
import './App.css';

class App extends Component {
  render() {
    const deviceTypeClass = isDeviceConsideredMobile() ? 'Mobile' : 'Desktop';

    return (
      <Flexbox flex="flex" flexDirection="row" flexWrap="wrap" className={`App App${deviceTypeClass}`}>
        {/* app logic pages  */}
        <Route exact path="/" component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/results" component={ResultsPage} />
        <Route path="/details/:id" component={DetailsPage} />
        <Route path="/landing" component={LandingPage} />

        {/* static pages */}
        <Route path="/static/contact" component={ContactPage} />
        {/* <Route path="/static/about" component={AboutUsPage} />
        <Route path="/static/imprint" component={ImprintPage} />
        <Route path="/static/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/static/affiliate-disclaimer" component={AffiliateDisclaimerPage} /> */}
      </Flexbox>
    );
  }
}

export default App;
