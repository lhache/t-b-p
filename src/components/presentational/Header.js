import React from 'react'
import Translate from 'react-translate-component'
import Flexbox from 'flexbox-react';
import ReactSVG from 'react-svg'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'
import { isDeviceConsideredMobile } from '../../data/utils'
import './Header.css'

const renderSubtitle = condition => {
  if (condition) {
    return (
      <Translate content="subtitle" className="HeaderSubtitle"/>
    )
  }
}

const showMobileHeader = () => {
  return (
    <Flexbox className="Header" flexBasis="100%" flexWrap="wrap">
      <Flexbox flex="flex" flexBasis="100%" className="HeaderLogoContainer" alignItems="baseline">
        <Link to="/" className="HeaderLogoLink">
          <ReactSVG
            path={logo}
            className="HeaderLogo"
          />
        </Link>
      </Flexbox>
      <Flexbox flexBasis="100%" flex="flex" justifyContent="flex-start">
        <Flexbox alignSelf="center" width="100%" marginBottom="20px">
          <Translate content="subtitle" component="h3" className="HeaderSubtitle" />
        </Flexbox>
      </Flexbox>
    </Flexbox>
  )
}

const showDesktopHeader = (type) => {
  return (
    <Flexbox className="Header" flexBasis="100%" flexWrap="wrap">
      <Flexbox flex="flex" flexBasis="100%" className="HeaderLogoContainer" alignItems="baseline">
        <Link to="/" className="HeaderLogoLink">
          <ReactSVG
            path={logo}
            className="HeaderLogo"
          />
        </Link>
        <Flexbox flexBasis="100%" flex="flex" justifyContent="flex-start">
          <h3 className="HeaderSubtitleOneLine">
            {renderSubtitle(type === 'oneline')}
          </h3>
        </Flexbox>
      </Flexbox>
      <Flexbox flex="flex" flexBasis="100%" justifyContent="center" marginBottom="20px">
        <h1 className="HeaderSubtitle">
          {renderSubtitle(type !== 'oneline')}
        </h1>
      </Flexbox>
    </Flexbox>
  )
}

const Header = ({type}) => {
  return (
    <Flexbox flex="flex" flexBasis="100%" className="HeaderContainer">
      {isDeviceConsideredMobile() ? showMobileHeader() : showDesktopHeader(type)}
    </Flexbox>
  )
}


export default Header
