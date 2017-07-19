import React from 'react';
import Translate from 'react-translate-component'
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
        <b> { term.map(t => t.title).join(' - ')} </b>
      </div>
    )
  }
}

const ResultsHeadline = ({type, term}) => {
  return (
    <div className="ResultsHeadline">
      { showWhichHeadline(type, term) }
    </div>
  )
}


export default ResultsHeadline;
