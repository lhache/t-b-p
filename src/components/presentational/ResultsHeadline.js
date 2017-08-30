import React from 'react';
import Translate from 'react-translate-component'
import Flexbox from 'flexbox-react'
import './ResultsHeadline.css'

const showWhichHeadline = (type, term) => {
  if (type === 'category') {
    return (
      <h3>
        { term.map(t => t.title)}
      </h3>
    )
  } else {
    return (
      <div>
        <Translate content="results.headline" component="span" />
        <b className="ResultsHeadlineTermCollection"> { term.map(t => t.label).join(' - ')} </b>
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
