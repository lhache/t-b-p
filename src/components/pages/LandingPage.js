import React, { Component } from 'react';
import Translate from 'react-translate-component'
import Results from '../containers/Results'
import Search from '../containers/Search'
import _last from 'lodash/last'
import Header from '../presentational/Header'
import Footer from '../presentational/Footer'
import USP from '../presentational/USP'
// import './LandingPage.css'


class LandingPage extends Component {

  render() {
    const {results, fetchResults, term} = this.props

    return (
      <div className="LandingPageContainer">
        <div className="HeaderBackground">
            <Header />
            <Search />
            <USP />
        </div>

        <Results />
        <Footer />
      </div>
    )
  }
}

export default LandingPage;
