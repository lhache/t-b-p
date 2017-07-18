import React from 'react';
import Flexbox from 'flexbox-react';
import Translate from 'react-translate-component'
import { isDeviceConsideredMobile } from '../../data/utils'
import './USP.css'

const showUSP = () => (
  <Flexbox flex="flex" flexBasis="100%" className="USPContainer">
      <Flexbox justifyContent="center" className="USP">
        <Flexbox flexDirection="column" className="USPUnit">
          <Translate content="USP.quality" component="p" className="USPHeader"/>
          <Translate content="USP.qualitySub" component="p" className="USPSub"/>
        </Flexbox>
        <Flexbox flexDirection="column" className="USPUnit">
          <Translate content="USP.trust" component="p" className="USPHeader"/>
          <Translate content="USP.trustSub" component="p" className="USPSub"/>
        </Flexbox>
        <Flexbox flexDirection="column" className="USPUnit">
          <Translate content="USP.easy" component="p" className="USPHeader"/>
          <Translate content="USP.easySub" component="p" className="USPSub"/>
        </Flexbox>
    </Flexbox>
  </Flexbox>
)

const USP = () => {
  return (
    <Flexbox flex="flex" flexBasis="100%">
      {!isDeviceConsideredMobile() && showUSP()}
    </Flexbox>
  )
}

export default USP;
