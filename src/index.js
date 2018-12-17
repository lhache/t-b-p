import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker'
import {registerTranslations} from './data/translations/translations.js'
import store from './store'
import history from './history'
import rootReducer from './reducers'
import middlewares from './middlewares'
import Root from './components/Root'

// main style
import './index.css';

// load translations
registerTranslations();

ReactDOM.render(
  <Root store={store} history={history}/>, document.getElementById('tbp-app-wrapper'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. Learn
// more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
