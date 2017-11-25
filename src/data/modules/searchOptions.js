import 'isomorphic-fetch'
import { buildUrl } from '../../utils/appUtils'
import { getCategoryKey } from '../../utils/appUtils'
import { getLocale } from '../translations/translations'

export const FETCH_SEARCH_OPTIONS = 'FETCH_SEARCH_OPTIONS'
export const FETCH_SEARCH_OPTIONS_SUCCESS = 'FETCH_SEARCH_OPTIONS_SUCCESS'
export const FETCH_SEARCH_OPTIONS_FAILURE = 'FETCH_SEARCH_OPTIONS_FAILURE'

export const initialState = {
  searchOptions: [],
  isFetching: false,
  hasFailedFetching: false
}

export const requestSearchOptions = (query, categories) => {
  return {
    type: FETCH_SEARCH_OPTIONS,
    query,
    categories
  }
}

export const receiveSearchOptions = (query, categories, searchOptions) => {
  return {
    type: FETCH_SEARCH_OPTIONS_SUCCESS,
    query,
    categories,
    searchOptions
  }
}

export const failedfetchingSearchOptions = (query, categories) => {
  return {
    type: FETCH_SEARCH_OPTIONS_FAILURE,
    query,
    categories
  }
}

export const searchOptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_OPTIONS:
      return Object.assign({}, state, {
        isFetching: true,
        hasFailedFetching: false
      })
    case FETCH_SEARCH_OPTIONS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        searchOptions: Object.assign({}, state.results, {
          searchOptions: action.searchOptions
        }),
        hasFailedFetching: false
      })
    case FETCH_SEARCH_OPTIONS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        hasFailedFetching: true
      })
    default:
      return initialState
  }
}

export const fetchSearchOptions = (query, categories) => dispatch => {
  dispatch(requestSearchOptions(query, categories))

  let queryParams = {}
debugger;
  if(query) {
    queryParams = Object.assign({}, queryParams, {q: query})
  }
  queryParams = Object.assign({}, queryParams, {c: getCategoryKey(categories)})

  const url = buildUrl(
    `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_SUGGEST_ENDPOINT}`,
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
      dispatch(receiveSearchOptions(query, categories, json)),
      error => dispatch(failedfetchingSearchOptions(query, categories))
    )
}
