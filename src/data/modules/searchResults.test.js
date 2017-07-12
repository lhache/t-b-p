import {
  initialState,
  STORE_TERM,
  STORE_SEARCHED_TERM,
  FETCH_RESULTS,
  FETCH_RESULTS_SUCCESS,
  FETCH_RESULTS_FAILURE,
  storeTerm,
  storeSearchedTerm,
  requestResults,
  receiveResults,
  fetchResults,
  searchResultsReducer
} from './searchResults'

// import for testing async action creators
import 'isomorphic-fetch'
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'
import mockData from '../../../public/results.json'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('actions', () => {

  it('should create an action to store a term', () => {
    const term = 'term'
    const expectedAction = {
      type: STORE_TERM,
      term
    }
    expect(storeTerm(term)).toEqual(expectedAction)
  })

  it('should create an action to store a searched term', () => {
    const searchedTerm = 'searchedTerm'
    const expectedAction = {
      type: STORE_SEARCHED_TERM,
      searchedTerm
    }
    expect(storeSearchedTerm(searchedTerm)).toEqual(expectedAction)
  })

  it('should create an action to request results', () => {
    const term = 'searched term'
    const expectedAction = {
      type: FETCH_RESULTS,
      term
    }
    expect(requestResults(term)).toEqual(expectedAction)
  })

  it('should create an action to receive results', () => {
    const term = 'searched term'
    const results = {
      results: [
        { "id": 1, "name": "item #1 from API" }
      ]
    }
    const expectedAction = {
      type: FETCH_RESULTS_SUCCESS,
      term,
      results: results.results
    }
    expect(receiveResults(term, results)).toEqual(expectedAction)
  })
})

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(searchResultsReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle STORE_TERM', () => {

    // test with empty state
    expect(
      searchResultsReducer([], {
        type: STORE_TERM,
        term: 'term'
      })
    ).toEqual(Object.assign({}, initialState, {
      term: 'term'
    }))

    // test with initial state
    expect(
      searchResultsReducer(initialState, {
        type: STORE_TERM,
        term: 'term'
      })
    ).toEqual(Object.assign({}, initialState, {
      term: 'term'
    }))

    // test with already altered state
    expect(
      searchResultsReducer({
          term: 'term1'
        },
        {
          type: STORE_TERM,
          term: 'term2'
        }
      )
    ).toEqual(Object.assign({}, initialState, {
      term: 'term2'
    }))
  })

  it('should handle STORE_SEARCHED_TERM', () => {

    // test with empty state
    expect(
      searchResultsReducer([], {
        type: STORE_SEARCHED_TERM,
        searchedTerm: 'term'
      })
    ).toEqual(Object.assign({}, initialState, {
      searchedTerm: 'term'
    }))

    // test with initial state
    expect(
      searchResultsReducer(initialState, {
        type: STORE_SEARCHED_TERM,
        searchedTerm: 'term'
      })
    ).toEqual(Object.assign({}, initialState, {
      searchedTerm: 'term'
    }))

    // test with already altered state
    expect(
      searchResultsReducer({
          searchedTerm: 'term1'
        },
        {
          type: STORE_SEARCHED_TERM,
          searchedTerm: 'term2'
        }
      )
    ).toEqual(Object.assign({}, initialState, {
      searchedTerm: 'term2'
    }))
  })

  it('should handle FETCH_RESULTS', () => {

    // test with empty state
    expect(
      searchResultsReducer([], {
        type: FETCH_RESULTS,
        term: 'term'
      })
    ).toEqual({
      term: 'term',
      isFetching: true,
      hasFailedFetching: false
    })

    // test with initial state
    expect(
      searchResultsReducer(initialState, {
        type: FETCH_RESULTS,
        term: 'term'
      })
    ).toEqual({
      term: 'term',
      searchedTerm: '',
      results: [],
      isFetching: true,
      hasFailedFetching: false
    })

    // test with already altered state
    expect(
      searchResultsReducer({
          results: [1: {}],
          isFetching: true,
          hasFailedFetching: false
        },
        {
          type: FETCH_RESULTS,
          term: 'term'
        }
      )
    ).toEqual({
        term: 'term',
        results: [1: {}],
        isFetching: true,
        hasFailedFetching: false
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
  })

  it('creates FETCH_RESULTS_SUCCESS when fetching results has been done', () => {
    const term = 'luliz'

    fetchMock.mock(
      `/results.json?q=${term}`,
      { body: mockData, status: 200 }
    )

    const expectedActions = [
      { type: FETCH_RESULTS, term },
      { type: FETCH_RESULTS_SUCCESS, results: mockData.results, term }
    ]
    const store = mockStore(initialState)

    return store.dispatch(fetchResults(term))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
