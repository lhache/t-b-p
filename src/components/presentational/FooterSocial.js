import React from 'react';
import Flexbox from 'flexbox-react';
import ReactSVG from 'react-svg'
import iconFacebook from '../../images/icon-f.svg'
import iconTwitter from '../../images/icon-t.svg'
import iconInstagram from '../../images/icon-insta.svg'
// import './FooterSocial.css'

const FooterSocial = () => {
  return (
    <Flexbox className="FooterSocial">
      <Flexbox marginLeft="10px">
        <a href="https://www.facebook.com/thebetterplay" className="FooterSocialIcon" target="_blank" rel="noopener noreferrer">
          <ReactSVG path={iconFacebook} />
        </a>
      </Flexbox>
      <Flexbox marginLeft="10px">
        <a href="https://www.twitter.com/thebetterplay" className="FooterSocialIcon" target="_blank" rel="noopener noreferrer">
          <ReactSVG path={iconTwitter} />
        </a>
      </Flexbox>
      <Flexbox marginLeft="10px">
        <a href="https://www.instagram.com/thebetterplay" className="FooterSocialIcon" target="_blank" rel="noopener noreferrer">
          <ReactSVG path={iconInstagram} />
        </a>
      </Flexbox>
    </Flexbox>
  )
}

export default FooterSocial;
