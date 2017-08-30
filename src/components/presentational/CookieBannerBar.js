import React from 'react';
import CookieBanner from 'react-cookie-banner';
import Flexbox from 'flexbox-react';
import counterpart from 'counterpart'
// import './CookieBannerBar.css'

const CookieBannerBar = () => {
  return (
    <Flexbox className="CookieBanner" flexBasis="100%">
      <CookieBanner
        message={counterpart('cookies.bannerText')}
        onAccept={() => {}}
        cookie='user-has-accepted-cookies'
        dismissOnScroll={false}
      />
    </Flexbox>
  )
}

export default CookieBannerBar;
