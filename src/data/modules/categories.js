import _flatten from 'lodash/flatten'

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
    categories: [],
    selectedCategories: []
}

// reducer
export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case STORE_CATEGORIES:
        return Object.assign({}, state, {
          categories: state.categories.length ? state.categories : action.categories
        })
      case STORE_SELECTED_CATEGORIES:
        return Object.assign({}, state, {
          selectedCategories: action.selectedCategories
        })
      default:
        return state
    }
  }

// helper function
export const getCategoriesByMatchingName = (categories, selectedCategories) => {
  const filteredCategories = _flatten(selectedCategories.map(selectedCategoryName => categories.filter(category => selectedCategoryName === category.name)))
  return filteredCategories
}