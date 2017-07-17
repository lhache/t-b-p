import React, { Component } from 'react';
import Translate from 'react-translate-component'
import Details from '../containers/Details'
import Search from '../containers/Search'
import _last from 'lodash/last'
import Header from '../presentational/Header'
import Footer from '../presentational/Footer'
import USP from '../presentational/USP'
// import './DetailsPage.css'


class DetailsPage extends Component {

  render() {
    const {results, fetchResults, term} = this.props

    return (
      <div className="ResultsPageContainer">
        <div className="HeaderBackground">
            <Header type="oneline" />
        </div>

        <Details />
        <Footer />
      </div>
    )
  }
}

export default DetailsPage;
