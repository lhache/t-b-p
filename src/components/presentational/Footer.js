import React from 'react';
import Translate from 'react-translate-component'
import ReactSVG from 'react-svg'
import Flexbox from 'flexbox-react';
import logo from '../../images/logo.svg'
import FooterSocial from './FooterSocial'
import FooterLinks from './FooterLinks'
import './Footer.css'

const Footer = () => {
  return (
    <Flexbox flex="flex" flexBasis="100%" className="FooterContainer">
        <Flexbox className="Footer" flexBasis="100%">
          <Flexbox flexDirection="column" justifyContent="flex-start" flexBasis="50%">
            <Flexbox>
                <ReactSVG
                  path={logo}
                  className="FooterLogo"
                />
              </Flexbox>
              <Flexbox>
                <Translate content="subtitle" />
              </Flexbox>
          </Flexbox>
          <Flexbox flexDirection="column" flexBasis="50%">
            <FooterSocial />
            <FooterLinks />
          </Flexbox>
      </Flexbox>
    </Flexbox>
  )
}


export default Footer;
