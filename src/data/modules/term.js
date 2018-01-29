
export const STORE_TERM = 'STORE_TERM'

export const initialState = {
    term: '',
}

// store term
export const storeTerm = term => ({
    type: STORE_TERM,
    term: term
})

// reducer
export const termReducer = (state = initialState, action) => {
    switch (action.type) {
      case STORE_TERM:
        return Object.assign({}, state, {
          term: action.term
        })
      default:
        return state
    }
}
  