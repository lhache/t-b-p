import {
  FETCH_RESULTS,
  FETCH_RESULTS_SUCCESS,
  FETCH_RESULTS_FAILURE,
  requestResults,
  receiveResults
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
