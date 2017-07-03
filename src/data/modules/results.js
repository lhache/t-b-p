import 'isomorphic-fetch'

export const FETCH_RESULTS = 'FETCH_RESULTS'
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS'
export const FETCH_RESULTS_FAILURE = 'FETCH_RESULTS_FAILURE'


export const requestResults = term => {
  return {
    type: FETCH_RESULTS,
    term
  }
}

// results: json.data.children.map(child => child.data),
export const receiveResults = (term, json) => {
  return {
    type: FETCH_RESULTS_SUCCESS,
    term,
    results: json.results,
    receivedAt: Date.now()
  }
}

// TODO action for failure

export const initialState = {
  results: [],
  isFetching: false,
  hasFailedFetching: false
}

// reducer
export const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return initialState
  }
}


export function fetchResults(term) {
  return function (dispatch) {
    dispatch(requestResults(term))
    return fetch(`/results.json?q=${term}`)
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
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(receiveResults(term, json))
      })
  }
}
