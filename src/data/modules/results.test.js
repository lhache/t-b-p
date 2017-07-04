import {
  initialState,
  FETCH_RESULTS,
  FETCH_RESULTS_SUCCESS,
  FETCH_RESULTS_FAILURE,
  requestResults,
  receiveResults,
  fetchResults,
  resultsReducer
} from './results'

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
    expect(resultsReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle FETCH_RESULTS', () => {

    // test with empty state
    expect(
      resultsReducer([], {
        type: FETCH_RESULTS,
        term: 'term'
      })
    ).toEqual({
      isFetching: true,
      hasFailedFetching: false
    })

    // test with initial state
    expect(
      resultsReducer(initialState, {
        type: FETCH_RESULTS,
        term: 'term'
      })
    ).toEqual({
      results: [],
      isFetching: true,
      hasFailedFetching: false
    })

    // test with already altered state
    expect(
      resultsReducer({
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

    fetchMock.once(
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
