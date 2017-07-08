import React from 'react';
import Translate from 'react-translate-component'
import { Row, Col } from 'react-flexbox-grid'
import './USP.css'

const USP = () => {
  return (
    <div className="USPContainer">
      <Row className="USP">
        <Col lg={4} className="USPUnit">
          <Translate content="USP.quality" component="p" className="USPHeader"/>
          <Translate content="USP.qualitySub" component="p"/>
        </Col>
        <Col lg={4} className="USPUnit">
          <Translate content="USP.trust" component="p" className="USPHeader"/>
          <Translate content="USP.trustSub" component="p"/>
        </Col>
        <Col lg={4} className="USPUnit">
          <Translate content="USP.easy" component="p" className="USPHeader"/>
          <Translate content="USP.easySub" component="p"/>
        </Col>
      </Row>
    </div>

  )
}

export default USP;
