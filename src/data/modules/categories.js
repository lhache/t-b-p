import _flatten from 'lodash/flatten'

// TODO check if searched cat can be removed
export const STORE_CATEGORIES = 'STORE_CATEGORIES'
export const STORE_SELECTED_CATEGORIES = 'STORE_SELECTED_CATEGORIES'


// store categories
export const storeCategories = categories => ({
    type: STORE_CATEGORIES,
    categories: categories
})
export const storeSelectedCategory = selectedCategory => ({
    type: STORE_SELECTED_CATEGORIES,
    selectedCategory: selectedCategory
})

export const initialState = {
    categories: [],
    selectedCategory: null
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
          selectedCategory: action.selectedCategory
        })
      default:
        return state
    }
  }

// helper function
export const getCategoriesByMatchingName = (categories, selectedCategory) => {
  const filteredCategories = _flatten(selectedCategory.map(selectedCategoryName => categories.filter(category => selectedCategoryName === category.name)))
  return filteredCategories
}