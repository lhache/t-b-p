export const MIN_AGE = 0
export const MAX_AGE = 1200

// action name
export const STORE_AGE = 'STORE_AGE'

// action
export const storeAge = (ages) => ({
    type: STORE_AGE,
    ages
})

// state
export const initialState = {
    ages: { 
        age_from: null, 
        age_until: null 
    }
}

// reducer
export const agesReducer = (state = initialState, action) => {
    switch (action.type) {
      case STORE_AGE:
        return Object.assign({}, state, {
          ages: action.ages
        })
      default:
        return state
    }
}