import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Translate from 'react-translate-component'
import Flexbox from 'flexbox-react'
import _isEmpty from 'lodash/isEmpty'
import { joinTermToStringWithSymbol } from '../../utils/appUtils'
import './ResultsHeadline.css'

class ResultsHeadlineContainer extends Component {
  render() {
    const { showPrefixText, selectedCategory, hardcodedTerms } = this.props

    const termsToDisplay = _isEmpty(selectedCategory) ? hardcodedTerms : selectedCategory

    return (
      <Flexbox className="ResultsHeadline" flexBasis="100%">
        { showPrefixText ?
            <Translate content="results.headline" component="h3" /> :
            <b className="ResultsHeadlineTermCollection">
              <Translate content="results.headlinePrefix" component="h3" /> 
              {/* { (!_isEmpty(termsToDisplay)) && decodeURIComponent(joinTermToStringWithSymbol(termsToDisplay, 'name', ' - ')) } */}
            </b>
        }
      </Flexbox>
    )
  }
}


const mapStateToProps = state => {
  return {
    selectedCategory: state.categories.selectedCategory
  }
}


const ResultsHeadline = connect(mapStateToProps)(ResultsHeadlineContainer)


export default ResultsHeadline;
