import 'isomorphic-fetch'
import { buildUrl } from '../../utils/appUtils'
import _concat from 'lodash/concat'
import { getCategoryKey } from '../../utils/appUtils'
import { getLocale } from '../translations/translations'


export const RESET_RESULTS = 'RESET_RESULTS'
export const FETCH_RESULTS = 'FETCH_RESULTS'
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS'
export const FETCH_RESULTS_FAILURE = 'FETCH_RESULTS_FAILURE'
export const SELECT_RESULT = 'SELECT_RESULT'


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

export const requestResults = searchedCategories => {
  return {
    type: FETCH_RESULTS,
    searchedCategories
  }
}

export const receiveResults = (searchedCategories, json) => {
  return {
    type: FETCH_RESULTS_SUCCESS,
    searchedCategories,
    results: json
  }
}

export const failedfetchingResults = (category) => {
  return {
    type: FETCH_RESULTS_FAILURE,
    category
  }
}

export const selectResult = id => {
  return {
    type: SELECT_RESULT,
    id
  }
}

// reducer
export const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_RESULTS:
      return Object.assign({}, state, {
        results: Object.assign({}, state.results, {
          [getCategoryKey(action.categoryKey)]: []
        }),
      })
    case FETCH_RESULTS:
      return Object.assign({}, state, {
        isFetching: true,
        hasFailedFetching: false
      })
    case FETCH_RESULTS_SUCCESS:
      const categoryKey = getCategoryKey(action.searchedCategories)
      return Object.assign({}, state, {
        isFetching: false,
        results: Object.assign({}, state.results, {
          [categoryKey]: _concat(state.results[categoryKey] || [], action.results)
        }),
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
    default:
      return state
  }
}

export const fetchResults = (term, categories, age, offset = 0) => dispatch => {
  dispatch(requestResults(categories))

  let queryParams = {
    c: getCategoryKey(categories),
    image_sizes: 'medium',
    offset
  }

  if(parseInt(age.age_from, 10) !== 0) {
    queryParams = Object.assign({}, queryParams, {age_from: age.age_from})
  }
  if(parseInt(age.age_until, 10) !== 1200) {
    queryParams = Object.assign({}, queryParams, {age_until: age.age_until})
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
    .then(json =>
      dispatch(receiveResults(categories, json)),
      error => dispatch(failedfetchingResults(categories))
    )
}
