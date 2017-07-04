import 'isomorphic-fetch'

export const FETCH_DETAILS = 'FETCH_DETAILS'
export const FETCH_DETAILS_SUCCESS = 'FETCH_DETAILS_SUCCESS'
export const FETCH_DETAILS_FAILURE = 'FETCH_DETAILS_FAILURE'


export const requestDetails = id => {
  return {
    type: FETCH_DETAILS,
    id
  }
}

export const receiveDetails = (id, json) => {
  return {
    type: FETCH_DETAILS_SUCCESS,
    id,
    details: json.details
  }
}

// TODO action for failure

export const initialState = {
  details: {},
  isFetching: false
}

// reducer
export const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DETAILS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        details: action.details
      })
      case FETCH_DETAILS_FAILURE:
        return Object.assign({}, state, {
          isFetching: false
        })
    default:
      return initialState
  }
}

export function fetchDetails(id) {
  return function (dispatch) {
    dispatch(requestDetails(id))
    return fetch(`/details.json?q=${id}`)
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
        dispatch(receiveDetails(id, json))
      })
  }
}
