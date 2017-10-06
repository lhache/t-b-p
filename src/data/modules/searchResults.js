import 'isomorphic-fetch'
import { buildUrl } from '../utils'

export const STORE_TERM = 'STORE_TERM'
export const STORE_SEARCHED_TERM = 'STORE_SEARCHED_TERM'
export const FETCH_RESULTS = 'FETCH_RESULTS'
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS'
export const FETCH_RESULTS_FAILURE = 'FETCH_RESULTS_FAILURE'

// store term
export const storeTerm = term => {
  return {
    type: STORE_TERM,
    term: term
  }
}

// store searchedTerm
  export const storeSearchedTerm = term => {
  return {
    type: STORE_SEARCHED_TERM,
    searchedTerm: term
  }
}

export const requestResults = term => {
  return {
    type: FETCH_RESULTS,
    term,
    searchedTerm: term
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

export const initialState = {
  term: [],
  searchedTerm: [],
  results: [],
  isFetching: false,
  hasFailedFetching: false
}

// reducer
export const searchResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TERM:
      return Object.assign({}, state, {
        term: action.term
      })
    case STORE_SEARCHED_TERM:
      return Object.assign({}, state, {
        searchedTerm: action.searchedTerm
      })
    case FETCH_RESULTS:
      return Object.assign({}, state, {
        isFetching: true,
        hasFailedFetching: false
      })
    case FETCH_RESULTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        results: action.results.slice(0, 20),  // look how naughty I am here
        hasFailedFetching: false
      })
    case FETCH_RESULTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        hasFailedFetching: true
      })
    case '@@router/LOCATION_CHANGE': {
      return Object.assign({}, state, {
        term: action.payload.state ? action.payload.state.term : [],
        searchedTerm: action.payload.state ? action.payload.state.term : []
      })
      }
    default:
      return initialState
  }
}

export const fetchResults = term => dispatch => {
  dispatch(requestResults(term))

  const url = buildUrl(
    `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_RESULTS_ENDPOINT}`,
    { q: term, image_sizes: 'medium' }
  )
  return fetch(url)
    .then(response => response.json())
    .then(json =>
      dispatch(receiveResults(term, json)),
      error => dispatch(failedfetchingResults(term))
    )
}
