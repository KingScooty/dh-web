import React, { createClass, PropTypes } from 'react';
import isRetina from 'is-retina';

import LazyLoadFade from '../_shared/LazyLoadFade';
import ResponsiveImage from '../_shared/ResponsiveImage';
import VerticalRhythm from '../_shared/VerticalRhythm';

const PostMedia = createClass({
  propTypes: {
    entities: PropTypes.shape({
      media: PropTypes.arrayOf(
        PropTypes.shape({
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
          }).isRequired
        })
      )
    }),
    extended_entities: PropTypes.shape({
      media: PropTypes.arrayOf(
        PropTypes.shape({
          media_url: PropTypes.string.isRequired,
          sizes: PropTypes.object.isRequired
        })
      )
    }),
    href: PropTypes.string
  },

  // Maybe move towards srcset and just list the sizes out in <img /> as this
  // won't work for the first server side render.
  getImageSize: function (imageUrl) {
    return isRetina() ? `${imageUrl}:large` : imageUrl;
  },

  imgElement: function (media) {
    return media.map((media, index) => {
      const imgUrl = this.getImageSize(media.media_url);

      return (
        <div className="stream-post__media-item" key={ index }>
          <a href={ this.props.href }>
            <div className="u-crop-rounded">
              <VerticalRhythm>
                <ResponsiveImage { ...media.sizes }>
                  <LazyLoadFade>
                    <img src={ imgUrl } />
                  </LazyLoadFade>
                </ResponsiveImage>
              </VerticalRhythm>
            </div>
          </a>
        </div>
      );
    });
  },

  getMedia: function () {
    if (this.props.extended_entities &&
        this.props.extended_entities.media) {
      return this.imgElement(this.props.extended_entities.media);
    }
    else if (this.props.entities &&
             this.props.entities.media) {
      return this.imgElement(this.props.entities.media);
    }
  },

  render: function () {
    const media = this.getMedia();
    if (!media) return false;

    return (
      <div>{ media }</div>
    );
  }
});

export default PostMedia;
