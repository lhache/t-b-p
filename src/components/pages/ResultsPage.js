import React, { Component } from 'react';
import Results from '../containers/Results'
import Search from '../containers/Search'
import Header from '../presentational/Header'
import Footer from '../presentational/Footer'
// import './ResultsPage.css'

class ResultsPage extends Component {

  render() {
    return (
      <div className="ResultsPageContainer">
        <div className="HeaderBackground">
            <Header type="oneline" />
            <Search />
        </div>

        <Results />
        <Footer />
      </div>
    )
  }
}

export default ResultsPage;
