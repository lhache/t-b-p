import React from 'react';
import Translate from 'react-translate-component'
import ReactSVG from 'react-svg'
import Flexbox from 'flexbox-react';
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'
import FooterSocial from './FooterSocial'
import FooterLinks from './FooterLinks'
import './Footer.css'
import { isDeviceConsideredMobile } from '../../data/utils'

const showMobileFooter = () => (
      <Flexbox className="Footer FooterMobile" flexBasis="100%" flexDirection="column">
        <Flexbox flexDirection="column" flexBasis="100%" alignSelf="center">
          <Flexbox alignSelf="center">
            <Link to="/" className="FooterLogoLink">
              <ReactSVG
                path={logo}
                className="FooterLogo"
              />
            </Link>
          </Flexbox>
          <Flexbox>
            <Translate content="subtitle" />
          </Flexbox>
        </Flexbox>
        <Flexbox flexDirection="column" flexBasis="100%" alignSelf="center">
          {/* <Flexbox alignSelf="center">
            <FooterSocial />
          </Flexbox> */}
          <Flexbox alignSelf="center" marginTop="20px">
            <FooterLinks />
          </Flexbox>
        </Flexbox>
    </Flexbox>
)

const showDesktopFooter = () => (
      <Flexbox className="Footer FooterDesktop" flexBasis="100%">
        <Flexbox flexDirection="column" justifyContent="flex-start" flexBasis="50%" alignSelf="center">
          <Flexbox>
            <Link to="/" className="FooterLogoLink">
              <ReactSVG
                path={logo}
                className="FooterLogo"
              />
            </Link>
          </Flexbox>
          <Flexbox>
            <Translate content="subtitle" />
          </Flexbox>
        </Flexbox>
        <Flexbox flexDirection="column" flexBasis="50%" justifyContent="flex-end" alignSelf="center">
          {/* <Flexbox alignSelf="flex-end">
            <FooterSocial />
          </Flexbox> */}
          <Flexbox alignSelf="flex-end">
            <FooterLinks />
          </Flexbox>
        </Flexbox>
    </Flexbox>
)

const Footer = () => {
  return (
    <Flexbox flex="flex" flexBasis="100%" className="FooterContainer">
      {isDeviceConsideredMobile() ? showMobileFooter() : showDesktopFooter()}
    </Flexbox>
  )
}

export default Footer;
