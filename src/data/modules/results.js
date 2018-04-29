import 'isomorphic-fetch'
import { buildUrl } from '../../utils/appUtils'
import _unionWith from 'lodash/unionWith'
import _isEqual from 'lodash/isEqual'
import { getCategoryKey } from '../../utils/appUtils'
import { getLocale } from '../translations/translations'
import { storeCategories } from './categories'
import { P } from 'glamorous';


export const RESET_RESULTS = 'RESET_RESULTS'
export const FETCH_RESULTS = 'FETCH_RESULTS'
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS'
export const FETCH_RESULTS_FAILURE = 'FETCH_RESULTS_FAILURE'
export const SELECT_RESULT = 'SELECT_RESULT'
export const RESET_SELECTED_RESULT = 'RESET_SELECTED_RESULT'


export const initialState = {
  results: {},
  isFetching: false,
  hasFailedFetching: false,
  selectedResult: null
}


export const resetResults = (categoryKey) => {
  return {
    type: RESET_RESULTS,
    categoryKey
  }
}

export const requestResults = (term, categories) => {
  return {
    type: FETCH_RESULTS,
    term,
    categories
  }
}

export const receiveResults = (term, searchedCategories, ages, results, json, offset) => {
  return {
    type: FETCH_RESULTS_SUCCESS,
    term,
    searchedCategories,
    results,
    ages,
    offset
  }
}

export const failedfetchingResults = (term, category) => {
  return {
    type: FETCH_RESULTS_FAILURE,
    term,
    category
  }
}

export const selectResult = id => {
  return {
    type: SELECT_RESULT,
    id
  }
}

export const resetSelectedResult = () => {
  return {
    type: RESET_SELECTED_RESULT
  }
}

// reducer
export const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_RESULTS:
      const storeCategory = action.categoryKey === 'term' ? 'term' : getCategoryKey(action.categoryKey)
      return Object.assign({}, state, {
        results: Object.assign({}, state.results, {
          [storeCategory]: []
        }),
      })
    case FETCH_RESULTS:
      return Object.assign({}, state, {
        isFetching: true,
        hasFailedFetching: false
      })
    case FETCH_RESULTS_SUCCESS:
      let categoryKey = getCategoryKey(action.searchedCategories)

      if (categoryKey === '') {
        categoryKey = 'term'
      }

      // if offset = 0, reset list otherwise stack results
      // const results = action.offset === 0 ? {
      //   [categoryKey]: action.results.products
      // } : Object.assign({}, state.results, {
      //   [categoryKey]: _unionWith(state.results[categoryKey] || [], action.results.products)
      // })

      let results 


      if (!action.results.products.length) {
        debugger
        results = {
          [categoryKey]: action.results.products
        }
      }
      // for categories & load more results
      // not for ages
      else {
        results = Object.assign({}, state.results, {
          [categoryKey]: _unionWith(state.results[categoryKey] || [], action.results.products, _isEqual)
        })
      }

      return Object.assign({}, state, {
        isFetching: false,
        results: results,
        hasFailedFetching: false
      })
    case FETCH_RESULTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        hasFailedFetching: true
      })
    case SELECT_RESULT:
      return Object.assign({}, state, {
        selectedResult: action.id
      })
    case RESET_SELECTED_RESULT:
      return Object.assign({}, state, {
        selectedResult: null
      })
    default:
      return state
  }
}

export const fetchResults = (term, categories, ages, offset = 0) => dispatch => {
  dispatch(requestResults(term, categories))

  let queryParams = {
    q: term || '',
    c: getCategoryKey(categories),
    image_sizes: 'medium',
    offset,
    age_from: ages.age_from,
    age_until: ages.age_until
  }

  const url = buildUrl(
    `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_RESULTS_ENDPOINT}`,
    queryParams
  )
  return fetch(url, {
    method: 'GET',
    headers: {
      'TBP-Locale': getLocale()
    }
  })
    .then(response => response.json())
    .then(
      json => {
        // debugger
        dispatch(receiveResults(term, categories, ages, json, offset))
        dispatch(storeCategories(json.categories))
      },
      error => dispatch(failedfetchingResults(term, categories))
    )
}
