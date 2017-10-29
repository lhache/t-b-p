import 'isomorphic-fetch'
import { buildUrl } from '../utils'
import _concat from 'lodash/concat'

export const STORE_TERM = 'STORE_TERM'
export const STORE_SELECTED_TERMS = 'STORE_SELECTED_TERMS'
export const STORE_AGE = 'STORE_AGE'
export const RESET_RESULTS = 'RESET_RESULTS'
export const FETCH_RESULTS = 'FETCH_RESULTS'
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS'
export const FETCH_RESULTS_FAILURE = 'FETCH_RESULTS_FAILURE'
export const FETCH_SUGGEST_OPTIONS = 'FETCH_SUGGEST_OPTIONS'
export const FETCH_SUGGEST_OPTIONS_SUCCESS = 'FETCH_SUGGEST_OPTIONS_SUCCESS'
export const FETCH_SUGGEST_OPTIONS_FAILURE = 'FETCH_SUGGEST_OPTIONS_FAILURE'

export const initialState = {
  term: '',
  selectedTerms: [],
  age: { age_from: 0, age_until: 1200 },
  suggestOptions: [],
  results: [],
  isFetching: false,
  hasFailedFetching: false
}

// store term
export const storeTerm = term => ({
  type: STORE_TERM,
  term: term
})

// store selectedTerms
  export const storeSelectedTerms = terms => ({
  type: STORE_SELECTED_TERMS,
  selectedTerms: terms
})

export const storeAge = (age) => ({
    type: STORE_AGE,
    age
  })

export const resetResults = () => {
  return {
    type: RESET_RESULTS
  }
}

export const requestResults = term => {
  return {
    type: FETCH_RESULTS,
    term,
    selectedTerms: term
  }
}

export const receiveResults = (term, json) => {
  return {
    type: FETCH_RESULTS_SUCCESS,
    term,
    results: json
  }
}

export const failedfetchingResults = (term) => {
  return {
    type: FETCH_RESULTS_FAILURE,
    term
  }
}

// reducer
export const searchResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TERM:
      return Object.assign({}, state, {
        term: action.term
      })
    case STORE_SELECTED_TERMS:
      return Object.assign({}, state, {
        selectedTerms: action.selectedTerms
      })
    case STORE_AGE:
      return Object.assign({}, state, {
        age: action.age
      })
    case RESET_RESULTS:
    return Object.assign({}, state, {
      results: initialState.results,
    })
    case FETCH_RESULTS:
      return Object.assign({}, state, {
        isFetching: true,
        hasFailedFetching: false
      })
    case FETCH_RESULTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        results: _concat(state.results, action.results),
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
    //     selectedTerms: action.payload.state ? action.payload.state.term : []
    //   })
    //   }
    default:
      return initialState
  }
}

export const fetchResults = (term, categories, age, offset = 0) => dispatch => {
  dispatch(requestResults(categories))

  const url = buildUrl(
    `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_RESULTS_ENDPOINT}`,
    {
      c: categories,
      image_sizes: 'medium',
      offset,
      age_from: age.age_from,
      age_until: age.age_until
    }
  )
  return fetch(url)
    .then(response => response.json())
    .then(json =>
      dispatch(receiveResults(categories, json)),
      error => dispatch(failedfetchingResults(categories))
    )
}
