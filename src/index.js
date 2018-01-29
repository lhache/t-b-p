import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { gaMiddleware } from './data/middlewares/gaMiddleware'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createHistory from 'history/createBrowserHistory'

// reducers
import { agesReducer } from './data/modules/ages'
import { termReducer } from './data/modules/term'
import { categoriesReducer } from './data/modules/categories'
import { resultsReducer } from './data/modules/results'
import { detailsReducer } from './data/modules/details'

// root component of App
import Root from './components/Root';

// main style
import './index.css';

import { registerTranslations } from './data/translations/translations.js'

// set history to browser history
 const history = createHistory({
  forceRefresh: true
})

// load translations
registerTranslations();

// middlewares
const middlewares = [
  thunk,
  routerMiddleware(history),
  gaMiddleware
];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

// reducers
const reducers = combineReducers({
  ages: agesReducer,
  term: termReducer,
  categories: categoriesReducer,
  results: resultsReducer,
  details: detailsReducer,
  routing: routerReducer
})

// store
const store = createStore(
  reducers,
  applyMiddleware(...middlewares)
)

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('tbp-app-wrapper')
)

// registerServiceWorker();
