
// TODO check if searched cat can be removed
export const STORE_CATEGORIES = 'STORE_CATEGORIES'
export const STORE_SELECTED_CATEGORIES = 'STORE_SELECTED_CATEGORIES'


// store categories
export const storeCategories = categories => ({
    type: STORE_CATEGORIES,
    categories: categories
})
export const storeSelectedCategories = selectedCategories => ({
    type: STORE_SELECTED_CATEGORIES,
    selectedCategories: selectedCategories
})

export const initialState = {
    categories: [
      { id: '0', name: 'cat1'}, 
      { id: '12', name: 'cat2'},
      { id: '24', name: 'cat3'}, 
      { id: '36', name: 'cat4'}, 
      { id: '48', name: 'cat5'}
    ],
    selectedCategories: []
}

// reducer
export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case STORE_CATEGORIES:
        return Object.assign({}, state, {
          categories: action.categories
        })
      case STORE_SELECTED_CATEGORIES:
        return Object.assign({}, state, {
          selectedCategories: action.selectedCategories
        })
      default:
        return state
    }
  }