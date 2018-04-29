import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Flexbox from 'flexbox-react';
import _find from 'lodash/find'
import _concat from 'lodash/concat'
import _reject from 'lodash/reject'
import { storeSelectedCategories, getCategoriesByMatchingName }  from '../../data/modules/categories'
import { resetResults, fetchResults, resetSelectedResult }  from '../../data/modules/results'
import { routeToResultsForCategories } from '../../data/routing'
import { getAppParam } from '../../utils/appUtils'
import Translate from 'react-translate-component'
import { Div } from 'glamorous'
import './Categories.css'

class CategoriesContainer extends Component {

  constructor(props) {
    super(props)

    this._updateCategories = this._updateCategories.bind(this)
  }

  componentWillMount() {
    const categories = getAppParam('c')

    if (categories) {
      const selectedCategoriesNames = [...categories.split(',')]
      let selectedCategories = getCategoriesByMatchingName(this.props.categories, selectedCategoriesNames)

      if (!selectedCategories.length) {
        selectedCategories = [...selectedCategoriesNames.map(name => ({ id: '', name}))]
      }
      selectedCategories && this.props.storeSelectedCategories(selectedCategories)
    }
  }
  
  _updateCategories(event) {
    const newlySelectedCategory = _find(this.props.categories, { id: event.target.value })
    const newSelectedCategories = _find(this.props.selectedCategories, newlySelectedCategory) ? 
      _reject(this.props.selectedCategories, newlySelectedCategory) :
      _concat(this.props.selectedCategories, newlySelectedCategory)

    this.props.storeSelectedCategories(newSelectedCategories)
    this.props.resetResults(newSelectedCategories)
    this.props.fetchResults('', newSelectedCategories, this.props.ages, this.props.results.length)
    this.props.resetSelectedResult()
  }


  render() {
    return (
      <Flexbox className="CategoriesContainer" flexBasis="100%" flexWrap="wrap" alignSelf="flex-start">
        {
          this.props.categories.length ? (
            <Div width="100%">
              <Translate content="categories.title" component="h3"/>
            </Div>) : 
            null
        }
        {
            this.props.categories.map((category) => {
              const className = _find(this.props.selectedCategories, category) ? 'CategoriesItem CategoriesItem-Active' : 'CategoriesItem'
                
                return (
                    <button
                      key={`${category.name}`}
                      className={className}
                      onClick={this._updateCategories}
                      value={category.id}
                    >
                        { category.name }
                    </button>
                )
            })
        }
      </Flexbox>
    )
  }
}

CategoriesContainer.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array
}

const mapStateToProps = state => {
  return {
    term: state.term.term,
    categories: state.categories.categories,
    selectedCategories: state.categories.selectedCategories,
    ages: state.ages.ages,
    results: state.results.results
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeSelectedCategories: categories => dispatch(storeSelectedCategories(categories)),
    fetchResults: (term, categories, offset) => dispatch(fetchResults(term, categories, offset)),
    resetResults: (cat) => dispatch(resetResults(cat)),
    resetSelectedResult: () => dispatch(resetSelectedResult())
  }
}

const Categories = withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer))

export default Categories;
