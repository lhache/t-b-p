import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Flexbox from 'flexbox-react';
import _find from 'lodash/find'
import _concat from 'lodash/concat'
import { storeSelectedCategories }  from '../../data/modules/categories'
import { resetResults, fetchResults }  from '../../data/modules/results'
import { getAppParam } from '../../utils/appUtils'
import './Categories.css'

class CategoriesContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedCategories: []
    }

    this._updateCategories = this._updateCategories.bind(this)
  }

  componentWillMount() {
    const categories = getAppParam('c')
    categories && this.props.storeCategories(categories)
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
    // let range = event.target.value.split('-')
    // const selectedAge = {
    //   age_from: range[0],
    //   age_until: range[1]
    // }
    // this.setState({ selectedAge })
    // this.props.storeAge(selectedAge)
    // this.props.resetResults(this.props.searchedCategories)
    // this.props.fetchResults(this.props.term, this.props.searchedCategories, selectedAge, this.props.results.length)

    
    const newlySelectedCategory = _find(this.props.categories, {  id: event.target.value })
    const newSelectedCategories = _concat(this.props.selectedCategories, newlySelectedCategory)
    debugger
    this.setState({ selectedCategories: newSelectedCategories })
    this.props.storeSelectedCategories(newSelectedCategories)
  }


  render() {
    return (
      <Flexbox className="Categoriesontainer" flexBasis="100%" flexWrap="wrap" alignSelf="flex-start">
        {
            this.props.categories.map((category) => {
                const className = (
                    this.state.selectedCategories.indexOf(category) !== -1 ? 'CategoriesItem CategoriesItem-Active' : 'CategoriesItem'
                )
                
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
                }
            )
        }
      </Flexbox>
    )
  }
}

CategoriesContainer.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    categories: state.categories.categories,
    selectedCategories: state.categories.selectedCategories
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
