import React, { createClass, PropTypes } from 'react';
import isRetina from 'is-retina';

import LazyLoadFade from '../_shared/LazyLoadFade';
import ResponsiveImage from '../_shared/ResponsiveImage';
import VerticalRhythm from '../_shared/VerticalRhythm';

const PostMediaTwitterPhoto = createClass({
  propTypes: {
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
    }).isRequired,
    href: PropTypes.string.isRequired
  },

  // Maybe move towards srcset and just list the sizes out in <img /> as this
  // won't work for the first server side render.
  getImageSize: function getImageSize(imageUrl) {
    return isRetina() ? `${imageUrl}:large` : imageUrl;
  },

  render: function render() {
    const imgUrl = this.getImageSize(this.props.media_url);

    return (
      <div className="stream-post__media-item">
        <a href={ this.props.href }>
          <div className="u-crop-rounded">
            <VerticalRhythm>
              <ResponsiveImage { ...this.props.sizes }>
                <LazyLoadFade>
                  <img src={ imgUrl } />
                </LazyLoadFade>
              </ResponsiveImage>
            </VerticalRhythm>
          </div>
        </a>
      </div>
    );
  }
});

export default PostMediaTwitterPhoto;
