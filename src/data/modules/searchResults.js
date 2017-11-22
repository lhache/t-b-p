import 'isomorphic-fetch'
import { buildUrl } from '../../utils/appUtils'
import _concat from 'lodash/concat'
import { getCategoryKey } from '../../utils/appUtils'
import { getLocale } from '../translations/translations'

export const STORE_TERM = 'STORE_TERM'
export const STORE_SELECTED_CATEGORIES = 'STORE_SELECTED_CATEGORIES'
export const STORE_SEARCHED_CATEGORIES = 'STORE_SEARCHED_CATEGORIES'
export const STORE_AGE = 'STORE_AGE'
export const RESET_RESULTS = 'RESET_RESULTS'
export const FETCH_RESULTS = 'FETCH_RESULTS'
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS'
export const FETCH_RESULTS_FAILURE = 'FETCH_RESULTS_FAILURE'

// TODO move age thing in its own state
export const maxAge = 1200

export const initialState = {
  term: '',
  selectedCategories: [],
  searchedCategories: [],
  age: { age_from: 0, age_until: 1200 },
  results: {},
  isFetching: false,
  hasFailedFetching: false
}

// store term
export const storeTerm = term => ({
  type: STORE_TERM,
  term: term
})

// store selectedCategories
export const storeSelectedCategories = categories => ({
  type: STORE_SELECTED_CATEGORIES,
  selectedCategories: categories
})

// store searched Categories
export const storeSearchedCategories = categories => ({
  type: STORE_SEARCHED_CATEGORIES,
  searchedCategories: categories
})

export const storeAge = (age) => ({
    type: STORE_AGE,
    age
  })

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

// reducer
export const searchResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TERM:
      return Object.assign({}, state, {
        term: action.term
      })
    case STORE_SELECTED_CATEGORIES:
      return Object.assign({}, state, {
        selectedCategories: action.selectedCategories
      })
    case STORE_SEARCHED_CATEGORIES:
      return Object.assign({}, state, {
        searchedCategories: action.searchedCategories
      })
    case STORE_AGE:
      return Object.assign({}, state, {
        age: action.age
      })
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

    // case '@@router/LOCATION_CHANGE': {
    //   return Object.assign({}, state, {
    //     term: action.payload.state ? action.payload.state.term : [],
    //     selectedCategories: action.payload.state ? action.payload.state.term : []
    //   })
    //   }
    default:
      return initialState
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
