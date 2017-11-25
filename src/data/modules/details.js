import 'isomorphic-fetch'
import { buildUrl } from '../../utils/appUtils'
import { getLocale } from '../translations/translations'

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
    details: json || {}
  }
}

export const failedfetchingDetails = (id) => {
  return {
    type: FETCH_DETAILS_FAILURE,
    id
  }
}

export const initialState = {
  details: {},
  isFetching: false,
  hasFailedFetching: false
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
          isFetching: false,
          hasFailedFetching: true
        })
    default:
      return initialState
  }
}

export const fetchDetails = id => dispatch => {
  dispatch(requestDetails(id))

  const url = buildUrl(
    `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_DETAILS_ENDPOINT}${id}`, {
      image_sizes: 'tiny,large'
    }
  )
  return fetch(url, {
    method: 'GET',
    headers: {
      'TBP-Locale': getLocale()
    }
  })
    .then(response => response.json())
    .then(json =>
      dispatch(receiveDetails(id, json)),
      error => dispatch(failedfetchingDetails(id))
    )
}
