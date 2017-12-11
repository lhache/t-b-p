import React from 'react'
import Details from '../connected/Details'
import Modal from 'react-modal'
// import './DetailsModal.css'

const DetailsModal = ({id, isOpened, close, next, prev}) => {
  const style = {
    overlay : {
      position          : 'fixed',
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(255, 255, 255, 0.75)'
    },
    content : {
      position                   : 'absolute',
      top                        : '40px',
      left                       : '40px',
      right                      : '40px',
      bottom                     : '40px',
      border                     : '1px solid #ccc',
      background                 : '#fff',
      overflow                   : 'auto',
      WebkitOverflowScrolling    : 'touch',
      borderRadius               : '4px',
      outline                    : 'none',
      padding                    : '20px'

    }
  }
  return (
    <Modal
      isOpen={isOpened}
      onRequestClose={close}
      style={style}
    >
      <div onClick={close}>close</div>
      <div onClick={prev}>prev</div>
      <div onClick={next}>next</div>
      <Details id={id} />
    </Modal>
  )
}


export default DetailsModal;
