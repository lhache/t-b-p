import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Search from '../../containers/Search'
import Header from '../../presentational/Header'
import Footer from '../../presentational/Footer'
import USP from '../../presentational/USP'
// import './PrivacyPolicyPage.css'

class PrivacyPolicyPage extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="PrivacyPolicyPageContainer">
        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="HeaderBackground">
            <Header />
        </Flexbox>

        <Flexbox>
          TODO
        </Flexbox>
        <Footer />
      </Flexbox>
    )
  }
}

export default PrivacyPolicyPage;
