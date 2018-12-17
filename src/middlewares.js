import { routerMiddleware } from 'connected-react-router'
import {gaMiddleware} from './data/middlewares/gaMiddleware'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'

// middlewares
let middlewares = (history) => {
  let m = [routerMiddleware(history), thunk, gaMiddleware]
  if (process.env.NODE_ENV !== 'production') {
    m.push(createLogger());
  }
  return m
}

export default middlewares
