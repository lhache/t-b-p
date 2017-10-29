import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Flexbox from 'flexbox-react';
import counterpart from 'counterpart';
import _last from 'lodash/last'
import { resetResults, fetchResults, storeAge, dispatchStoreAge }  from '../../data/modules/searchResults'
import { joinTermToStringWithSymbol } from '../../utils/appUtils'
import { parseQueryString } from '../../data/utils'
import { resultsUrl } from '../../data/urls'
import _get from 'lodash/get'
import './Ages.css'

const maxAge = 1200
const ageRanges = [
  { age_from: 0, age_until: 3},
  { age_from: 3, age_until: 6},
  { age_from: 6, age_until: 12},
  { age_from: 12, age_until: 24},
  { age_from: 24, age_until: 36},
  { age_from: 36, age_until: 48},
  { age_from: 48, age_until: 60},
  { age_from: 60, age_until: 72},
  { age_from: 72, age_until: 84},
  { age_from: 84, age_until: 96},
  { age_from: 96, age_until: 108},
  { age_from: 108, age_until: 120},
  { age_from: 120, age_until: 132},
  { age_from: 132, age_until: 144},
  { age_from: 0, age_until: maxAge}
]

const formatMonthOrYear = age => {
  if (age < 12) {
    return `${ age } ${ counterpart('age.months') }`
  }
  else if (age >= 12 && age < 24) {
    return `${ age / 12 } ${ counterpart('age.year') }`
  }
  else {
    return `${ age / 12 } ${ counterpart('age.years') }`
  }
}

const displayFormattedAge = range => {
  if (range.age_until === maxAge) {
    return counterpart('age.allAges')
  }
  return formatMonthOrYear(range.age_from) + ' - ' + formatMonthOrYear(range.age_until)
}

class AgesContainerContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedAge: ''
    }

    this._updateAge = this._updateAge.bind(this)
  }

  componentWillMount() {
    const searchParams = parseQueryString(this.props.history.location.search)
    const ageFrom = _get(searchParams, 'age_from')
    const ageUntil = _get(searchParams, 'age_until')
    const age = {}

    ageFrom && Object.assign(age, { age_from: ageFrom })
    ageUntil && Object.assign(age, { age_until: ageUntil })
    this.props.storeAge(age)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.age !== this.state.selectedAge) {
      let selectedAge = ageRanges.filter(r => (
        parseInt(this.props.age.age_from, 10) === parseInt(r.age_from, 10)
        &&  parseInt(this.props.age.age_until, 10) === parseInt(r.age_until, 10)
      ))
      if (!selectedAge.length) selectedAge = [_last(ageRanges)]

      this.setState({ selectedAge: selectedAge[0] })
    }
  }

  _updateAge(event) {
    let range = event.target.value.split('-')
    const selectedAge = {
      age_from: range[0],
      age_until: range[1]
    }
    this.setState({ selectedAge })
    this.props.storeAge(selectedAge)
    this.props.resetResults()
    this.props.fetchResults(this.props.term, this.props.term, selectedAge, this.props.results.length)
  }


  render() {
    return (
      <Flexbox className="AgeContainer" flexBasis="100%" flexWrap="wrap">
        {ageRanges.map((ageRange) => {
          const className = (
            this.state.selectedAge === ageRange
            ? 'AgeItem AgeItem-Active' : 'AgeItem')
          return (
            <button
              key={`${ageRange.age_from}-${ageRange.age_until}`}
              className={className}
              onClick={this._updateAge}
              value={`${ageRange.age_from}-${ageRange.age_until}`}
              >
                 {displayFormattedAge(ageRange)}
            </button>
          )
        })}

      </Flexbox>
    )
  }
}

AgesContainerContainer.propTypes = {
  age: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    term: state.searchResults.term,
    selectedTerms: state.searchResults.selectedTerms,
    age: state.searchResults.age,
    results: state.searchResults.results
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeAge: age => dispatch(storeAge(age)),
    fetchResults: (term, categories, offset) => dispatch(fetchResults(term, categories, offset)),
    resetResults: () => dispatch(resetResults())
  }
}

const Ages = withRouter(connect(mapStateToProps, mapDispatchToProps)(AgesContainerContainer))

export default Ages;
