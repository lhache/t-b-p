import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Flexbox from 'flexbox-react';
import _find from 'lodash/find'
import _concat from 'lodash/concat'
import { storeSelectedCategories, getCategoriesByMatchingName }  from '../../data/modules/categories'
import { resetResults, fetchResults }  from '../../data/modules/results'
import { getAppParam } from '../../utils/appUtils'
import './Categories.css'

class CategoriesContainer extends Component {

  constructor(props) {
    super(props)

    this._updateCategories = this._updateCategories.bind(this)
  }

  componentWillMount() {
    const selectedCategoriesNames = [...getAppParam('c').split(',')]
    const selectedCategories = getCategoriesByMatchingName(this.props.categories, selectedCategoriesNames)
    
    selectedCategories && this.props.storeSelectedCategories(selectedCategories)
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.age !== this.state.selectedAge && this.props.age.age_from !== null && this.props.age.age_until !== null) {
    //   let selectedAge = ageRanges.filter(r => (
    //     parseInt(this.props.age.age_from, 10) === parseInt(r.age_from, 10)
    //     &&  parseInt(this.props.age.age_until, 10) === parseInt(r.age_until, 10)
    //   ))
    //   if (!selectedAge.length) selectedAge = [_last(ageRanges)]

    //   this.setState({ selectedAge: selectedAge[0] })
    // }
  }

  _updateCategories(event) {
    const newlySelectedCategory = _find(this.props.categories, {  id: event.target.value })
    const newSelectedCategories = _concat(this.props.selectedCategories, newlySelectedCategory)
    
    this.props.resetResults(newSelectedCategories)
    this.props.storeSelectedCategories(newSelectedCategories)
    this.props.fetchResults(this.props.term, newSelectedCategories, this.props.ages, this.props.results.length)
  }


  render() {
    return (
      <Flexbox className="Categoriesontainer" flexBasis="100%" flexWrap="wrap" alignSelf="flex-start">
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
    resetResults: (cat) => dispatch(resetResults(cat))
  }
}

const Categories = connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer)

export default Categories;
