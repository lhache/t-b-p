import React from 'react'
import Translate from 'react-translate-component'
import { Row, Col } from 'react-flexbox-grid'
import ReactSVG from 'react-svg'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'
import './Header.css'
import USP from './USP'

const renderSubtitle = condition => {
  if (condition) {
    return (
      <Translate content="subtitle" className="HeaderSubtitle"/>
    )
  }
}

const Header = ({type}) => {
  return (
    <Row className="HeaderContainer" center="xs">
      <Col md={12}>
        <Row className="Header">
          <Col className="HeaderLogoContainer">
            <Link to="/" className="HeaderLogoLink">
              <ReactSVG
                path={logo}
                className="HeaderLogo"
              />
            </Link>
            <h3 className="HeaderSubtitleOneLine">
              {renderSubtitle(type === 'oneline')}
            </h3>
          </Col>
          <Col md={12}>
            <h1>
              {renderSubtitle(type !== 'oneline')}
            </h1>

          </Col>
        </Row>
      </Col>
    </Row>
  )
}


export default Header
