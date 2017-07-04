import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import App from './containers/App';
import Results from './containers/Results';
import Details from './containers/Details';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root
