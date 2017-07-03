import { STORE_TERM, storeTerm } from './search'

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
