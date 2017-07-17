import React, { Component } from 'react';
import Details from '../containers/Details'
import Header from '../presentational/Header'
import Footer from '../presentational/Footer'
// import './DetailsPage.css'


class DetailsPage extends Component {

  render() {
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
