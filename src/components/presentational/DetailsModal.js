import React, { Component } from 'react'
import Details from '../connected/Details'
import Modal from 'react-modal'
import ReactSVG from 'react-svg'
import Translate from 'react-translate-component'
import Flexbox from 'flexbox-react'
import './DetailsModal.css'
import { isDeviceConsideredMobile } from '../../utils/appUtils'

const styleDesktop = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)',
    zIndex            : 1000
  },
  content : {
    position                   : 'absolute',
    top                        : '5rem',
    left                       : '5rem',
    right                      : '5rem',
    bottom                     : '5rem',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'
  }
}
const styleMobile = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)',
    zIndex            : 1000
  },
  content : {
    position                   : 'absolute',
    top                        : '10px',
    left                       : '10px',
    right                      : '10px',
    bottom                     : '10px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'
  }
}


class DetailsModal extends Component {

  constructor(props) {
    super(props)
    this._handleKeyDown = this._handleKeyDown.bind(this)
    this._showMobileModal = this._showMobileModal.bind(this)
    this._showDesktopModal = this._showDesktopModal.bind(this)
  }

  componentWillMount(){
    document.addEventListener("keydown", this._handleKeyDown)
  }

  _handleKeyDown(e) {
    if (e.which === 37) {
       this.props.prev()
    } else if (e.which === 39) {
       this.props.next()
    } else if (e.which === 27) {
       this.props.close()
    }
  }

  _showMobileModal() {
    return (
      <Modal
        isOpen={this.props.isOpened}
        onRequestClose={this.props.close}
        style={styleMobile}
      >
        <Flexbox flexDirection="column">
          <Flexbox justifyContent="flex-end" flexBasis="100%">
            <Flexbox className="DetailsModal-Button" onClick={this.props.close}>
              {/* <ReactSVG path={`${process.env.REACT_APP_ASSET_HOST}/icon-x-black.svg`} style={{width: 48, height: 48}} /> */}
              <ReactSVG path={`/images/icon-x-black.svg`} style={{width: 60, height: 60}} />
            </Flexbox>
          </Flexbox>
          <Flexbox justifyContent="flex-end" flexBasis="100%">
            <Details id={this.props.id} />
          </Flexbox>
          <Flexbox flexDirection="row" flexBasis="100%%">
            <Flexbox alignItems="center" flexBasis="50%"  justifyContent="flex-start">
              <Flexbox className="DetailsModal-Button" onClick={this.props.prev} alignItems="center">
                {/* <ReactSVG path={`${process.env.REACT_APP_ASSET_HOST}/icon-arrow-left-black-m.svg`} style={{width: 48, height: 48}} /> */}
                <ReactSVG path={`/images/icon-arrow-left-black-m.svg`} style={{width: 48, height: 48}} />
                <Translate content="product.prevProduct" />
              </Flexbox>
            </Flexbox>
              <Flexbox alignItems="center" flexBasis="50%" justifyContent="flex-end">
                <Flexbox className="DetailsModal-Button" onClick={this.props.next} alignItems="center">
                 <Translate content="product.nextProduct" />
                  {/* <ReactSVG path={`${process.env.REACT_APP_ASSET_HOST}/icon-arrow-right-black-m.svg`} style={{width: 48, height: 48}} /> */}
                  <ReactSVG path={`/images/icon-arrow-right-black-m.svg`} style={{width: 48, height: 48}} />
                </Flexbox>
              </Flexbox>
           </Flexbox>
          </Flexbox> 
        </Modal>
    )
  }

  _showDesktopModal() {
    return (
      <Modal
        isOpen={this.props.isOpened}
        onRequestClose={this.props.close}
        style={styleDesktop}
      >
        <Flexbox flexDirection="column">
          <Flexbox justifyContent="flex-end" flexBasis="100%">
            <Flexbox className="DetailsModal-Button" onClick={this.props.close}>
              {/* <ReactSVG path={`${process.env.REACT_APP_ASSET_HOST}/icon-x-black.svg`} /> */}
              <ReactSVG path={`/images/icon-x-black.svg`} style={{width: 60, height: 60}} />
            </Flexbox>
          </Flexbox>
          <Flexbox flexDirection="row" minHeight="600px">
            <Flexbox alignItems="center" flexBasis="10%" justifyContent="flex-start">
              <Flexbox className="DetailsModal-Button" onClick={this.props.prev}>
                {/* <ReactSVG path={`${process.env.REACT_APP_ASSET_HOST}/icon-arrow-left-black-m.svg`} /> */}
                <ReactSVG path={`/images/icon-arrow-left-black-m.svg`} style={{width: 48, height: 48}} />
              </Flexbox>
            </Flexbox>
            <Flexbox flexBasis="80%" minHeight="50%">
              <Details id={this.props.id} />
            </Flexbox>
              <Flexbox alignItems="center" flexBasis="10%" justifyContent="flex-end">
                <Flexbox className="DetailsModal-Button" onClick={this.props.next}>
                  {/* <ReactSVG path={`${process.env.REACT_APP_ASSET_HOST}/icon-arrow-right-black-m.svg`} /> */}
                  <ReactSVG path={`/images/icon-arrow-right-black-m.svg`} style={{width: 48, height: 48}} />
                </Flexbox>
              </Flexbox>
           </Flexbox>
          </Flexbox> 
        </Modal>
    )
  }
  
  render() {
    const {id, isOpened, close, next, prev, amountOfItems, selectedResultsIndex} = this.props
    
    return (
      <Flexbox>
        { isDeviceConsideredMobile() ?
          this._showMobileModal() :
          this._showDesktopModal()
        }
      </Flexbox>
    )
  }
}  

export default DetailsModal;
