import React from 'react';
import ImageGallery from 'react-image-gallery';
import _isEmpty from 'lodash/isEmpty'
import "react-image-gallery/styles/css/image-gallery.css";
import './ProductImageGallery.css'

const ProductImageGallery = images => {
  return (
    !_isEmpty(images.images) &&
    <div className="fadeIn">
      <ImageGallery
        items={images.images}
        disableArrowKeys={true}
        disableThumbnailScroll={false}
        showPlayButton={false}
        showFullscreenButton={true}
        showNav={false}
        slideInterval={2000}
        lazyLoad={true}
        slideOnThumbnailHover={true}
        // onImageLoad={this.handleImageLoad}
      />
      </div>
  )
}

export default ProductImageGallery;
