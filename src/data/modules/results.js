import 'isomorphic-fetch'
import { buildUrl } from '../../utils/appUtils'
import _unionWith from 'lodash/unionWith'
import _isEqual from 'lodash/isEqual'
import _omit from 'lodash/omit'
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

export const receiveResults = (term, selectedCategory, ages, results, json, offset) => {
  return {
    type: FETCH_RESULTS_SUCCESS,
    term,
    selectedCategory,
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
      const storeCategory = action.categoryKey ? action.categoryKey : 'term'
      return Object.assign({}, state, {
        results: _omit(state.results, [storeCategory])
      })
    case FETCH_RESULTS:
      return Object.assign({}, state, {
        isFetching: true,
        hasFailedFetching: false
      })
    case FETCH_RESULTS_SUCCESS:
      const categoryName = action.selectedCategory ? action.selectedCategory.name : 'term'
      const results = !action.results.products.length ? 
          { [categoryName]: action.results.products } :
          Object.assign({}, state.results, {
            [categoryName]: _unionWith(state.results[categoryName] || [], action.results.products, _isEqual)
          })

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

export const fetchResults = (term, category, ages, offset = 0) => dispatch => {
  dispatch(requestResults(term, category))

  let queryParams = {
    q: term || '',
    c: category ? category.name : '',
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
        dispatch(receiveResults(term, category, ages, json, offset))
        dispatch(storeCategories(json.categories))
      },
      error => dispatch(failedfetchingResults(term, category))
    )
}
