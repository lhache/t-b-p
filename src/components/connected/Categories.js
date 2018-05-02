import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Flexbox from 'flexbox-react';
import _find from 'lodash/find'
import _concat from 'lodash/concat'
import { storeSelectedCategory, getCategoriesByMatchingName }  from '../../data/modules/categories'
import { resetResults, fetchResults, resetSelectedResult }  from '../../data/modules/results'
import { routeToResultsForCategories } from '../../data/routing'
import { getAppParam } from '../../utils/appUtils'
import Translate from 'react-translate-component'
import { Div } from 'glamorous'
import counterpart from 'counterpart'
import './Categories.css'

class CategoriesContainer extends Component {

  constructor(props) {
    super(props)

    this._updateCategory = this._updateCategory.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.categories !== nextProps.categories) {
      const category = getAppParam('c')

      if (category) {
        this.props.storeSelectedCategory(_find(nextProps.categories, { name: category }))
      }
    }
  }
  
  _updateCategory(event) {
    const newlySelectedCategory = _find(this.props.categories, { id: event.target.value })
    
    this.props.resetResults(this.props.selectedCategory)
    this.props.storeSelectedCategory(newlySelectedCategory)
    this.props.fetchResults('', newlySelectedCategory, this.props.ages, this.props.results.length)
    this.props.resetSelectedResult()
  }


  render() {

    const options = _concat(this.props.categories, [{
      id: '',
      name: counterpart('categories.allCategories')
    }])
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
            options.map((category) => {
                const className = this.props.selectedCategory === category || (!this.props.selectedCategory && category.id === '') ? 
                  'CategoriesItem CategoriesItem-Active' : 
                  'CategoriesItem'
                return (
                    <button
                      key={`${category.name}`}
                      className={className}
                      onClick={this._updateCategory}
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


const mapStateToProps = state => {
  return {
    term: state.term.term,
    categories: state.categories.categories,
    selectedCategory: state.categories.selectedCategory,
    ages: state.ages.ages,
    results: state.results.results
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeSelectedCategory: categories => dispatch(storeSelectedCategory(categories)),
    fetchResults: (term, categories, offset) => dispatch(fetchResults(term, categories, offset)),
    resetResults: (cat) => dispatch(resetResults(cat)),
    resetSelectedResult: () => dispatch(resetSelectedResult())
  }
}

const Categories = withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer))

export default Categories;
