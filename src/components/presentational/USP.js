import React from 'react';
import Translate from 'react-translate-component'
import { Row, Col } from 'react-flexbox-grid'
import './USP.css'

const USP = () => {
  return (
    <Row className="USPContainer" around="xs">
      <Col md={12}>
        <Row className="USP">
          <Col md={4} lg={4} className="USPUnit">
            <Translate content="USP.quality" component="p" className="USPHeader"/>
            <Translate content="USP.qualitySub" component="p" className="USPSub"/>
          </Col>
          <Col md={4} lg={4} className="USPUnit">
            <Translate content="USP.trust" component="p" className="USPHeader"/>
            <Translate content="USP.trustSub" component="p" className="USPSub"/>
          </Col>
          <Col md={4} lg={4} className="USPUnit">
            <Translate content="USP.easy" component="p" className="USPHeader"/>
            <Translate content="USP.easySub" component="p" className="USPSub"/>
          </Col>
        </Row>
      </Col>

    </Row>

  )
}

export default USP;
