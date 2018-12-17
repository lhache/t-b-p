
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import {agesReducer} from './data/modules/ages'
import {termReducer} from './data/modules/term'
import {categoriesReducer} from './data/modules/categories'
import {resultsReducer} from './data/modules/results'
import {detailsReducer} from './data/modules/details'

const rootReducer = (history) => combineReducers({
  ages: agesReducer,
  term: termReducer,
  categories: categoriesReducer,
  results: resultsReducer,
  details: detailsReducer,
  router: connectRouter(history)
})

export default rootReducer
