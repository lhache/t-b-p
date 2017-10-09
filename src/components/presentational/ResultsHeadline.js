import React from 'react';
import Translate from 'react-translate-component'
import Flexbox from 'flexbox-react'
import { isDeviceConsideredMobile } from '../../data/utils'
import _isEmpty from 'lodash/isEmpty'
import './ResultsHeadline.css'

const showWhichHeadline = (type, term) => {
  if (type === 'category') {
    return (
      <h3>
        { term.map(t => t.title)}
      </h3>
    )
  } else {
    return (!_isEmpty(term) &&
      <div>
        <Translate content="results.headline" component="span" />
        <b className="ResultsHeadlineTermCollection"> { term } </b>
      </div>
    )
  }
}

const ResultsHeadline = ({type, term}) => {
  return (
    <Flexbox className="ResultsHeadline" flexBasis="100%">
      { !isDeviceConsideredMobile() && showWhichHeadline(type, term) }
    </Flexbox>
  )
}


export default ResultsHeadline;
