import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createBrowserHistory'

// reducers
import { searchReducer } from './data/modules/search'
import { resultsReducer } from './data/modules/results'
import { detailsReducer } from './data/modules/details'

// root component of App
import Root from './components/Root';
// main style
import './index.css';

// set history to browser history
const history = createHistory()

// middlewares
const middlewares = [ thunk, routerMiddleware(history) ];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

// reducers
const reducers = combineReducers({
  search: searchReducer,
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
  document.getElementById('root')
)

registerServiceWorker();
