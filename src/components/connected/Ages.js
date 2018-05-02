import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Flexbox from 'flexbox-react';
import counterpart from 'counterpart';
import _last from 'lodash/last'
import { resetResults, fetchResults, resetSelectedResult }  from '../../data/modules/results'
import { storeAge, MAX_AGE, MIN_AGE }  from '../../data/modules/ages'
import { getAppParam } from '../../utils/appUtils'
import Translate from 'react-translate-component'
import { Div } from 'glamorous'
import './Ages.css'

const ageRanges = [
  { age_from: 0, age_until: 12}, // 0-1
  { age_from: 12, age_until: 24}, // 1-2
  { age_from: 24, age_until: 36}, // 2-3
  { age_from: 36, age_until: 48}, // 3-4
  { age_from: 48, age_until: 60}, // 4-5
  { age_from: 60, age_until: 72}, // 5-6
  { age_from: 72, age_until: 84}, // 6-7
  { age_from: 84, age_until: 96}, // 7-8
  { age_from: 96, age_until: 108}, // 8-9
  { age_from: 108, age_until: 120}, // 9-10
  { age_from: 120, age_until: 132}, // 10-11
  { age_from: 132, age_until: 144}, // 11-12
  { age_from: 144, age_until: 156}, // 12-13
  { age_from: 0, age_until: MAX_AGE} // // all
]

const formatMonthOrYear = (age, withText = true) => {
  if (age < 12) {
    return `${ age } ${ withText ? counterpart('age.months') : '' }`
  }
  else if (age >= 12 && age < 24) {
    return `${ age / 12 } ${ withText ? counterpart('age.year')  : ''}`
  }
  else {
    return `${ age / 12 } ${ withText ? counterpart('age.years')  : ''}`
  }
}

const displayFormattedAge = range => {
  if (range.age_until === MAX_AGE) {
    return counterpart('age.allAges')
  }
  else if (range.age_from === 0) {
    return formatMonthOrYear(range.age_from, false) + ' - ' + range.age_until + ' ' + counterpart('age.months')  // erk
  }
  else {
    return formatMonthOrYear(range.age_from)
  }
}

class AgesContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedAges: null
    }

    this._updateAges = this._updateAges.bind(this)
  }

  componentWillMount() {
    const ages = {}
    const ageFrom = getAppParam('age_from')
    const ageUntil = getAppParam('age_until')
    
    Object.assign(ages, { age_from: ageFrom ? ageFrom : MIN_AGE })
    Object.assign(ages, { age_until: ageUntil ? ageUntil : MAX_AGE })
    
    this.props.storeAge(ages)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ages !== this.state.selectedAges && this.props.ages.age_from !== null && this.props.ages.age_until !== null) {
      let selectedAges = ageRanges.filter(r => (
        parseInt(this.props.ages.age_from, 10) === parseInt(r.age_from, 10)
        &&  parseInt(this.props.ages.age_until, 10) === parseInt(r.age_until, 10)
      ))
      if (!selectedAges.length) {
        selectedAges = [_last(ageRanges)]
      }
      this.setState({ selectedAges: selectedAges[0] })
    }
  }

  _updateAges(event) {
    let range = event.target.value.split('-')
    const selectedAges = {
      age_from: range[0],
      age_until: range[1]
    }
    const selectedCategory = this.props.selectedCategory ? this.props.selectedCategory : 'term'
    
    this.setState({ selectedAges })
    this.props.storeAge(selectedAges)
    this.props.resetResults(selectedCategory)
    this.props.fetchResults(this.props.term, this.props.selectedCategory, selectedAges, this.props.results.length)
    this.props.resetSelectedResult()
  }


  render() {
    return (
      <Flexbox className="AgeContainer" flexBasis="100%" flexWrap="wrap" alignSelf="flex-start">
      {
          this.props.ages ? (
            <Div width="100%">
              <Translate content="age.title" component="h3"/>
            </Div>) : 
            null
        }
        {ageRanges.map((ageRange) => {
          const className = (
            this.state.selectedAges !== ageRange ? 'AgeItem' : 'AgeItem AgeItem-Active'
          )
          
          return (
            <button
              key={`${ageRange.age_from}-${ageRange.age_until}`}
              className={className}
              onClick={this._updateAges}
              value={`${ageRange.age_from}-${ageRange.age_until}`}
              >
                 { displayFormattedAge(ageRange) }
            </button>
          )
        })}
      </Flexbox>
    )
  }
}

AgesContainer.propTypes = {
  ages: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    term: state.term.term,
    selectedCategory: state.categories.selectedCategory,
    ages: state.ages.ages,
    results: state.results.results
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeAge: age => dispatch(storeAge(age)),
    fetchResults: (term, categories, offset) => dispatch(fetchResults(term, categories, offset)),
    resetResults: (cat) => dispatch(resetResults(cat)),
    resetSelectedResult: () => dispatch(resetSelectedResult())
  }
}

const Ages = withRouter(connect(mapStateToProps, mapDispatchToProps)(AgesContainer))

export default Ages;
