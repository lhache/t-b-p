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
          This website is operated by:

          THE BETTER PLAY
          Katja Navarra
          Husemannstrasse 10
          10435 Berlin
          www.thebetterplay.com

          Contact: info@thebetterplay. We usually will get back to you within 60 Min!


          This website is a web-based toy search engine. Our aim is to help you find a good toy fast, by offering you range of selected products, based on your individual search criteria. Please note that we are not a online-shop and therefore don't sell any products on our website.
        </Flexbox>
        <Footer />
      </Flexbox>
    )
  }
}

export default PrivacyPolicyPage;
