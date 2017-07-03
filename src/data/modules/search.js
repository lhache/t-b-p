

// action constant
export const STORE_TERM = 'STORE_TERM'

// set initial state
const initialState = {
  term: ""
}

// actions
export const storeTerm = term => {
  return {
    type: STORE_TERM,
    term: term
  }
}

// reducer
export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_TERM:
      return Object.assign({}, initialState, {
        term: action.term
      })
    default:
      return initialState
  }
}
