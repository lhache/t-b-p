import React from 'react'
import Translate from 'react-translate-component'
import { Row, Col } from 'react-flexbox-grid'
import ReactSVG from 'react-svg'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'
import './Header.css'
import USP from './USP'

const Header = () => {
  return (
    <Row className="HeaderContainer" center="xs">
      <Col md={12}>
        <Row className="Header">
          <Col className="HeaderLogoContainer">
            <Link to="/">
              <ReactSVG
                path={logo}
                className="HeaderLogo"
              />
            </Link>
          </Col>
          <Col md={12}>
            <Translate content="subtitle" component="h1" className="HeaderSubtitle"/>
          </Col>
        </Row>
      </Col>
      <Col md={12}>
        <USP />
      </Col>
    </Row>
  )
}


export default Header
