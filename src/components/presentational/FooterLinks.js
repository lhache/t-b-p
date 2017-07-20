import React from 'react';
import Flexbox from 'flexbox-react';
import Translate from 'react-translate-component'
import { Link } from 'react-router-dom'
// import './FooterLinks.css'

const FooterLinks = () => {
  return (
    <Flexbox className="FooterLinks">
      <Flexbox marginLeft="10px">
        <Link to="/privacy-policy">
          <Translate content="pages.privacy" />
        </Link>
      </Flexbox>
      <Flexbox marginLeft="10px">
        <Link to="/impressum">
          <Translate content="pages.impressum" />
        </Link>
      </Flexbox>
    </Flexbox>
  )
}

export default FooterLinks;
