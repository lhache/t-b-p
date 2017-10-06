import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CookieBanner from 'react-cookie-banner';
import Flexbox from 'flexbox-react';
import counterpart from 'counterpart'
// import './CookieBannerBar.css'

class CookieBannerBar extends Component {
  constructor(props) {
    super(props)

    let wrapper = document.getElementById('cookie-banner-wrapper')

    // create the element if it's not there
    // mainly a temp hack for development setup
    if (!this.element) {
      wrapper = document.createElement('div')
      wrapper.setAttribute('id', 'cookie-banner-wrapper')
    }

    this.portalElement = wrapper;

  }

  render() {
    return ReactDOM.createPortal(
      <Flexbox className="CookieBanner" flexBasis="100%">
        <CookieBanner
          message={counterpart('cookies.bannerText')}
          onAccept={() => {}}
          cookie='user-has-accepted-cookies'
          dismissOnScroll={false}
        />
      </Flexbox>,
      this.portalElement,
    );
  }
}


export default CookieBannerBar;
