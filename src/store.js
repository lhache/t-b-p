import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers'
import middlewares from './middlewares'
import history from './history'

const store = createStore(
  rootReducer(history),
  applyMiddleware(...middlewares(history))
)

export default store
