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
import _first from 'lodash/first'
import _uniq from 'lodash/uniq'
import _flatten from 'lodash/flatten'
import './App.css';

class App extends Component {
  render() {
    const deviceTypeClass = isDeviceConsideredMobile() ? 'Mobile' : 'Desktop';

    let appRoutes = [
      { path: '/',
        component: HomePage,
        exact: true
      },
      { path: searchUrl,
        component: SearchPage
      },
      { path: resultsUrl,
        component: ResultsPage
      },
      { path: detailsUrl,
        component: DetailsPage
      },
      { path: '/' + _first(defaultLocale.split('-')) + landingPageUrl,
        component: LandingPage
      }
    ]

    appRoutes = _uniq(_flatten(supportedLanguages.map(l => {
      const shortenedLanguage = _first(l.split('-'))
      return appRoutes.concat([
        { path: '/' + shortenedLanguage,
          component: HomePage,
          exact: true
        },
        { path: '/' + shortenedLanguage + searchUrl,
          component: SearchPage
        },
        { path: '/' + shortenedLanguage + resultsUrl,
          component: ResultsPage
        },
        { path: '/' + shortenedLanguage + detailsUrl,
          component: DetailsPage
        }
      ])
    })))

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
