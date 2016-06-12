import React, { Component, PropTypes } from 'react';
import isRetina from 'is-retina';
import LazyLoadFade from '../_shared/LazyLoadFade';
import ResponsiveImage from '../_shared/ResponsiveImage';

// Maybe move towards srcset and just list the sizes out in <img /> as this
// won't work for the first server side render.
const getImageSize = function getImageSize(imageUrl) {
  return isRetina() ? `${imageUrl}:large` : imageUrl;
};

// const handleVerticalRhythm = function handleVerticalRhythm(e) {
//   this.setState({windowWidth: window.innerWidth});
// };

class PostMediaImage extends Component {
  render() {
    const imgUrl = getImageSize(this.props.media_url);

    return (
      <ResponsiveImage { ...this.props.sizes }>
        <LazyLoadFade>
          <img src={ imgUrl } />
        </LazyLoadFade>
      </ResponsiveImage>
    );
  }
}

PostMediaImage.propTypes = {
  media_url: PropTypes.string.isRequired,
  sizes: PropTypes.shape({
    medium: PropTypes.shape({
      w: PropTypes.number.isRequired,
      h: PropTypes.number.isRequired
    }).isRequired,
    large: PropTypes.shape({
      w: PropTypes.number.isRequired,
      h: PropTypes.number.isRequired
    }).isRequired
  })
};

export default PostMediaImage;
