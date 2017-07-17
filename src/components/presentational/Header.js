import React from 'react'
import Translate from 'react-translate-component'
import Flexbox from 'flexbox-react';
import ReactSVG from 'react-svg'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'
import './Header.css'

const renderSubtitle = condition => {
  if (condition) {
    return (
      <Translate content="subtitle" className="HeaderSubtitle"/>
    )
  }
}

const Header = ({type}) => {
  return (
    <Flexbox flex="flex" flexBasis="100%" className="HeaderContainer">
      <Flexbox className="Header">

        <Flexbox flex="flex" className="HeaderLogoContainer">
          <Link to="/" className="HeaderLogoLink">
            <ReactSVG
              path={logo}
              className="HeaderLogo"
            />
          </Link>
          <h3 className="HeaderSubtitleOneLine">
            {renderSubtitle(type === 'oneline')}
          </h3>
        </Flexbox>

        <Flexbox flex="flex">
          <h1>
            {renderSubtitle(type !== 'oneline')}
          </h1>

        </Flexbox>
      </Flexbox>
    </Flexbox>
  )
}


export default Header
