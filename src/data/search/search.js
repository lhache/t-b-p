

// action constant
const TRIGGER_SEARCH = 'TRIGGER_SEARCH'

// set initial state
const initialState = {
  term: ""
}

// actions
export const triggerSearch = term => {
  return {
    type: TRIGGER_SEARCH,
    term: term
  }
}

// reducer
export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRIGGER_SEARCH:
      return Object.assign({}, initialState, {
        term: action.term
      })
    default:
      return initialState
  }
}
