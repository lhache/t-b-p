import React from 'react';
import Translate from 'react-translate-component'
import ReactSVG from 'react-svg'
import { Row, Col } from 'react-flexbox-grid'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'
import iconFacebook from '../../images/icon-f.svg'
import iconTwitter from '../../images/icon-t.svg'
import iconInstagram from '../../images/icon-insta.svg'
import './Footer.css'

const Footer = () => {
  return (
    <Row className="FooterContainer" center="xs">
      <Col md={12}>
        <Row className="Footer">
          <Col xs={12} md={4}>
            <Row>
              <Col xs={12} md={12}>
                <ReactSVG
                  path={logo}
                  className="FooterLogo"
                />
              </Col>
              <Col xs={12} md={12}>
                <Translate content="subtitle" />
              </Col>
            </Row>
          </Col>
          <Col xs={12} mdOffset={4} md={4}>
            <Row className="FooterSocial" center="xs">
              <Col mdOffset={3} md={2}>
                <a href="https://www.facebook.com/thebetterplay" target="_blank">
                  <ReactSVG
                    path={iconFacebook}
                    className="FooterSocialIcon"
                  />
                </a>
              </Col>
              <Col md={2} xsOffset={1}>
                <a href="https://www.twitter.com/thebetterplay" target="_blank">
                  <ReactSVG
                    path={iconTwitter}
                    className="FooterSocialIcon"
                  />
                </a>
              </Col>
              <Col md={2} xsOffset={1}>
                <a href="https://www.instagram.com/thebetterplay" target="_blank">
                  <ReactSVG
                    path={iconInstagram}
                    className="FooterSocialIcon"
                  />
                </a>
              </Col>
            </Row>
            <Row className="FooterLinks" center="xs">
              <Col mdOffset={1} md={4} xsOffset={1}>
                <Link to="/privacy">
                  <Translate content="pages.privacy" />
                </Link>
              </Col>
              <Col md={4} xsOffset={1}>
                <Link to="/impressum">
                  <Translate content="pages.impressum" />
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}


export default Footer;
