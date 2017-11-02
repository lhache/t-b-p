import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import ResultsPage from './pages/ResultsPage'
import DetailsPage from './pages/DetailsPage'
import LandingPage from './pages/LandingPage'
import Flexbox from 'flexbox-react';
import { isDeviceConsideredMobile } from './../utils/appUtils'
import { searchUrl, resultsUrl, detailsUrl, landingPageUrl } from './../data/urls'
import { supportedLanguages, defaultLocale } from '../data/translations/translations'
import './App.css';

class App extends Component {
  render() {
    const deviceTypeClass = isDeviceConsideredMobile() ? 'Mobile' : 'Desktop';

    let appRoutes = [
      { path: searchUrl,
        component: SearchPage
      },
      { path: resultsUrl,
        component: ResultsPage
      },
      { path: detailsUrl,
        component: DetailsPage
      },
      { path: '/' + defaultLocale + landingPageUrl,
        component: LandingPage
      }
    ];

    supportedLanguages.map(l => {
      return appRoutes.push({
        path: '/' + l,
        component: HomePage,
        exact: true
      })
    })

    return (
      <Flexbox flex="flex" flexDirection="row" flexWrap="wrap" className={`App App${deviceTypeClass}`}>
        { appRoutes.map(r => (
          <Route key={r.path} exact={r.exact} path={r.path} component={r.component} />
        ))}
      </Flexbox>
    );
  }
}

export default App;
