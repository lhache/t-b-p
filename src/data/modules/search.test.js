import {
  initialState,
  STORE_TERM,
  storeTerm,
  searchReducer
} from './search'

describe('actions', () => {
  it('should create an action to store a term', () => {
    const term = 'searched term'
    const expectedAction = {
      type: STORE_TERM,
      term
    }
    expect(storeTerm(term)).toEqual(expectedAction)
  })
})


describe('reducer', () => {
  it('should return the initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle STORE_TERM', () => {

    // test with empty state
    expect(
      searchReducer([], {
        type: STORE_TERM,
        term: 'term'
      })
    ).toEqual({
      term: 'term'
    })

    // test with initial state
    expect(
      searchReducer(initialState, {
        type: STORE_TERM,
        term: 'term'
      })
    ).toEqual({
      term: 'term'
    })

    // test with already altered state
    expect(
      searchReducer({
          term: 'term1'
        },
        {
          type: STORE_TERM,
          term: 'term2'
        }
      )
    ).toEqual({
      term: 'term2'
    })
  })
})
