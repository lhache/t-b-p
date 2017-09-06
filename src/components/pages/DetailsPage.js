import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Details from '../containers/Details'
import Header from '../presentational/Header'
// import Footer from '../presentational/Footer'
// import './DetailsPage.css'


class DetailsPage extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="ResultsPageContainer">
        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="HeaderBackground">
            <Header type="oneline" />
        </Flexbox>

        <Details />
        {/* <Footer /> */}
      </Flexbox>
    )
  }
}

export default DetailsPage;
