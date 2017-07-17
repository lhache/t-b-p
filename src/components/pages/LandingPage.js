import React, { Component } from 'react';
import Results from '../containers/Results'
import Search from '../containers/Search'
import Header from '../presentational/Header'
import Footer from '../presentational/Footer'
import USP from '../presentational/USP'
// import './LandingPage.css'


class LandingPage extends Component {

  render() {
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
