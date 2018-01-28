import React, { Component } from 'react'
import Details from '../connected/Details'
import Modal from 'react-modal'
import ReactSVG from 'react-svg'
import Flexbox from 'flexbox-react'
import './DetailsModal.css'

const styleDesktop = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.25)',
    zIndex            : 1000
  },
  content : {
    position                   : 'absolute',
    top                        : '5rem',
    left                       : '8rem',
    right                      : '8rem',
    bottom                     : '5rem',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '10px'
  }
}

class DetailsModal extends Component {

  constructor(props) {
    super(props)
    this._handleKeyDown = this._handleKeyDown.bind(this)
    this._onModalClose = this._onModalClose.bind(this)
    this._onAfterModalOpen = this._onAfterModalOpen.bind(this)
  }

  _onAfterModalOpen(){
    const modalNode = document.getElementsByClassName("ReactModal__Overlay")[0]
    modalNode.addEventListener("keydown", this._handleKeyDown)
  }

  _onModalClose(){
    const modalNode = document.getElementsByClassName("ReactModal__Overlay")[0]
    modalNode.removeEventListener("keydown", this._handleKeyDown)
    this.props.close()

    window.ga && window.ga('send', {
      hitType: 'event',
      eventCategory: 'modal-window',
      eventAction: 'close',
      eventLabel: this.props.id
     });
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

  render() {
    return (
      <Flexbox className="DetailsModal">
        <Modal
        isOpen={this.props.isOpened}
        onAfterOpen={this._onAfterModalOpen}
        onRequestClose={this._onModalClose}
        style={styleDesktop}
      >
        <Flexbox flexDirection="column">
          <Flexbox justifyContent="flex-end" flexBasis="100%">
            <Flexbox className="DetailsModal-Button" onClick={this.props.close}>
              {/* <ReactSVG path={`${process.env.REACT_APP_ASSET_HOST}/icon-x-black.svg`} /> */}
              <ReactSVG path={`/images/icon-x-black.svg`} style={{width: 60, height: 60}} />
            </Flexbox>
          </Flexbox>
          <Flexbox flexDirection="row" minHeight="550px">
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
      </Flexbox>
    )
  }
}  

export default DetailsModal;
