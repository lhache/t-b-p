import React from 'react';
import Translate from 'react-translate-component'
import Flexbox from 'flexbox-react'
import _isEmpty from 'lodash/isEmpty'
import './ResultsHeadline.css'

const showWhichHeadline = (type, term) => {
  if (type === 'category') {
    return (
      <h3>
        <b className="ResultsHeadlineTermCollection"> { decodeURIComponent(term) } </b>
      </h3>
    )
  } else {
    return (!_isEmpty(term) &&
      <div>
        <Translate content="results.headline" component="span" />
        <b className="ResultsHeadlineTermCollection"> { decodeURIComponent(term) } </b>
      </div>
    )
  }
}

const ResultsHeadline = ({type, term}) => {
  return (
    <Flexbox className="ResultsHeadline" flexBasis="100%">
      { showWhichHeadline(type, term) }
    </Flexbox>
  )
}


export default ResultsHeadline;
