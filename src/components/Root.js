import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import Home from './containers/Home';
import Search from './containers/Search';
import Details from './containers/Details';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/search/:term" component={Search}/>
        <Route path="/details/:id" component={Details}/>
      </div>
    </ConnectedRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root
