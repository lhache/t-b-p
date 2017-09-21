import 'isomorphic-fetch'

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

// TODO action for failure

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
        results: action.results,
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


export function fetchResults(term) {
  return function (dispatch) {
    dispatch(requestResults(term))
    return fetch(`${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_RESULTS_ENDPOINT}${term}`)
      .then(
        response => {
            return response.json()
        },
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing an loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occured.', error)
      )
      .then(json => {

        //
        // dispatch(storeTerm) ??

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(receiveResults(term, json))
      })
  }
}
