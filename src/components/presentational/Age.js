import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import counterpart from 'counterpart';
import _last from 'lodash/last'
import './Age.css'

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

class Age extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedAge: ''
    }

    this._updateAge = this._updateAge.bind(this)
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
    this.props.update(selectedAge)
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
                + | {displayFormattedAge(ageRange)}
            </button>
          )
        })}

      </Flexbox>
    )
  }
}

export default Age;
