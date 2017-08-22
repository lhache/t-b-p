import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import Search from '../../containers/Search'
import Header from '../../presentational/Header'
import Footer from '../../presentational/Footer'
import USP from '../../presentational/USP'
// import './ImpressumPage.css'

class ImpressumPage extends Component {

  render() {
    return (
      <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="ImpressumPageContainer">
        <Flexbox flex="flex" flexBasis="100%" flexWrap="wrap" className="HeaderBackground">
            <Header />
        </Flexbox>

        <Flexbox flexWrap="wrap">
          <Flexbox flexBasis="100%">
            This website is operated by:
          </Flexbox>
          <Flexbox flexBasis="100%">
            THE BETTER PLAY<br/>
            Katja Navarra<br/>
            Husemannstrasse 10<br/>
            10435 Berlin<br/>
            www.thebetterplay.com

          </Flexbox>
          <Flexbox flexBasis="100%">
            Contact: info@thebetterplay.com. We usually will get back to you within 60 Min!
          </Flexbox>
          <Flexbox flexBasis="100%">
            This website is a web-based toy search engine. Our aim is to help you find a good toy fast, by offering you range of selected products, based on your individual search criteria. Please note that we are not a online-shop and therefore don't sell any products on our website.
          </Flexbox>
        </Flexbox>
        <Footer />
      </Flexbox>
    )
  }
}

export default ImpressumPage;
