import {
  initialState,
  FETCH_RESULTS,
  FETCH_RESULTS_SUCCESS,
  FETCH_RESULTS_FAILURE,
  requestResults,
  receiveResults,
  resultsReducer
} from './results'

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
      results: results.results,
      receivedAt: Date.now()
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
