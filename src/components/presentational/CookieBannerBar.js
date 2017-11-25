import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CookieBanner from 'react-cookie-banner';
import Flexbox from 'flexbox-react';
import counterpart from 'counterpart'
import { getOrCreateElementById } from '../../utils/domUtils'
import './CookieBannerBar.css'

class CookieBannerBar extends Component {
  render() {
    return ReactDOM.createPortal(
      <Flexbox className="CookieBanner" flexBasis="100%">
        <CookieBanner
          message={counterpart('cookies.bannerText')}
          buttonMessage={counterpart('cookies.buttonText')}
          onAccept={() => {}}
          cookie='user-has-accepted-cookies'
          dismissOnScroll={ true }
        />
      </Flexbox>,
      getOrCreateElementById('div', { id: 'cookie-banner-wrapper'}),
    );
  }
}


export default CookieBannerBar;
