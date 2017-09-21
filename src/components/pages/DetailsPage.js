import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Details from '../containers/Details'
// import './DetailsPage.css'


class DetailsPage extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="ResultsPageContainer">
        <Details />
      </Flexbox>
    )
  }
}

export default DetailsPage;
