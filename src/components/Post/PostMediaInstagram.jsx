import React, { createClass, PropTypes } from 'react';

import LazyLoadFade from '../_shared/LazyLoadFade';
import ResponsiveImage from '../_shared/ResponsiveImage';
import VerticalRhythm from '../_shared/VerticalRhythm';

const PostMediaInstagram = createClass({
  propTypes: {
    shortcode: PropTypes.string.isRequired// ,
    // href: PropTypes.string.isRequired
  },

  defineSizes: function defineSizes() {
    return {
      medium: {
        w: 600,
        h: 600,
        resize: 'fit'
      }
    };
  },

  getInstagramImage: function getInstagramImage(shortcode) {
    return `https://instagram.com/p/${shortcode}/media/?size=l`;
  },

  render: function render() {
    const sizes = this.defineSizes();
    const shortcode = this.props.shortcode;
    const imgUrl = this.getInstagramImage(shortcode);

    return (
      <div className="stream-post__media-item">
        <a href={ `https://www.instagram.com/p/${shortcode}/` }>
          <div className="u-crop-rounded">
            <VerticalRhythm>
              <ResponsiveImage { ...sizes }>
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

export default PostMediaInstagram;
