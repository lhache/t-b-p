import React, { Component } from 'react'
import { connect } from 'react-redux'
import Flexbox from 'flexbox-react'
import Translate from 'react-translate-component'
import Results from '../connected/Results'
import Details from '../connected/Details'
import Search from '../connected/Search'
import Ages from '../connected/Ages'
import Categories from '../connected/Categories'
import ResultsHeadline from '../connected/ResultsHeadline'
import Filter from '../presentational/Filter'
import { isDeviceConsideredMobile } from '../../utils/appUtils'
import { getAppParam } from '../../utils/appUtils'
import { Div } from 'glamorous'
// import './ResultsPage.css'

class ResultsPageContainer extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" maxWidth="100%" className="ResultsPageContainer">

        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="">
            <Search />
        </Flexbox>

        { 
          isDeviceConsideredMobile() ? 
          <Filter /> :
          (
            <div>
              <Ages />
              <Categories />
            </div>
          )
        }
        <Div marginTop="20px">
           <Details />
        </Div>

        <ResultsHeadline showPrefixText={ getAppParam('c') } />
        <Results hideLoadMore={false} />

      </Flexbox>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedResult: state.results.selectedResult
  }
}

const mapDispatchToProps = dispatch => ({})

const ResultsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsPageContainer)

export default ResultsPage
