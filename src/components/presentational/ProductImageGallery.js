import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import _isEmpty from 'lodash/isEmpty'
import "react-image-gallery/styles/css/image-gallery.css";
import './ProductImageGallery.css'

class ProductImageGallery extends Component {
  render() {
    return (
      !_isEmpty(this.props.images) &&
      <div className="fadeIn">
        <ImageGallery
          items={this.props.images}
          disableArrowKeys={true}
          disableThumbnailScroll={false}
          showPlayButton={false}
          showFullscreenButton={false}
          showNav={false}
          slideInterval={2000}
          lazyLoad={false}
          slideOnThumbnailHover={true}
          onImageLoad={(e) => this.props.onImageLoad(e)}
          showFullscreenButton={ true }
          // onClick={ (e) => this.props.routingFunction() }
        />
      </div>
    )
  }
}

export default ProductImageGallery;
