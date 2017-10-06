import React from 'react';
import ImageGallery from 'react-image-gallery';
import _isEmpty from 'lodash/isEmpty'
import "react-image-gallery/styles/css/image-gallery.css";
import './ProductImageGallery.css'

const ProductImageGallery = images => {
  return (
    !_isEmpty(images.images) &&
      <ImageGallery
        items={images.images}
        disableArrowKeys={true}
        disableThumbnailScroll={false}
        showPlayButton={false}
        showFullscreenButton={false}
        showNav={false}
        slideInterval={2000}
        lazyLoad={true}
        slideOnThumbnailHover={true}
        // onImageLoad={this.handleImageLoad}
      />
  )
}

export default ProductImageGallery;
