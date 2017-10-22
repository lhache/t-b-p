import React from 'react';
import ReactSVG from 'react-svg'
import Flexbox from 'flexbox-react';
// import './Loader.css'

const Loader = () => {
  return (
    <Flexbox flexBasis="100%" justifyContent="center">
      <ReactSVG path={`${process.env.REACT_APP_ASSET_HOST}/static/media/loader.svg`} />
    </Flexbox>
  )
}


export default Loader;
