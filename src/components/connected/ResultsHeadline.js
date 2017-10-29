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
    const { showPrefixText, searchedCategories, hardcodedTerms } = this.props

    const termsToDisplay = _isEmpty(searchedCategories) ? hardcodedTerms : searchedCategories

    return (
      <Flexbox className="ResultsHeadline" flexBasis="100%">
        { showPrefixText && <Translate content="results.headline" component="span" /> }
        &nbsp;
        <b className="ResultsHeadlineTermCollection">
          { (!_isEmpty(termsToDisplay)) && decodeURIComponent(joinTermToStringWithSymbol(termsToDisplay, 'name', ' - ')) }
        </b>
      </Flexbox>
    )
  }
}

ResultsHeadlineContainer.propTypes = {
  searchedCategories: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    searchedCategories: state.searchResults.searchedCategories
  }
}


const ResultsHeadline = connect(mapStateToProps)(ResultsHeadlineContainer)


export default ResultsHeadline;
