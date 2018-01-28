import React from 'react';
import ReactSVG from 'react-svg'
import Flexbox from 'flexbox-react';
// import './Loader.css'

const Loader = (props) => {
  return (
    <Flexbox flexBasis="100%" justifyContent="center" margin="0 auto" padding="40px" style={props.style}>
      <ReactSVG path={`/images/loader.svg`} />
      {/* <ReactSVG path={`${process.env.REACT_APP_ASSET_HOST}/loader.svg`} /> */}
    </Flexbox>
  )
}


export default Loader;
