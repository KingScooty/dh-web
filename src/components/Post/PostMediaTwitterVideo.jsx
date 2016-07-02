import React, { createClass, PropTypes } from 'react';

import ResponsiveImage from '../_shared/ResponsiveImage';
import VerticalRhythm from '../_shared/VerticalRhythm';

const PostMediaTwitterVideo = createClass({
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
    video_info: PropTypes.shape({
      variants: PropTypes.arrayOf(
        PropTypes.shape({
          content_type: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired
        })
      ).isRequired
    }).isRequired,
    href: PropTypes.string
  },

  getVideoSrc: function getVideo(video) {
    return video.variants[0].url;
  },

  getVideoType: function getVideoType(video) {
    return video.variants[0].content_type;
  },

  // getVideoSize: function getVideoSize(sizes) {
  //   return sizes.medium;
  // },

  render: function render() {
    const videoSrc = this.getVideoSrc(this.props.video_info);
    const videoType = this.getVideoType(this.props.video_info);
    // const videoSize = this.getVideoSize(this.props.sizes);

    return (
      <div className="stream-post__media-item">
        <a href={ this.props.href }>
          <div className="u-crop-rounded">
            <VerticalRhythm>
              <ResponsiveImage { ...this.props.sizes } disablePlaceholder={ true }>
                <video className="stream-post__video" autoPlay loop controls muted>
                  <source src={ videoSrc } type={ videoType } />
                </video>
              </ResponsiveImage>
            </VerticalRhythm>
          </div>
        </a>
      </div>
    );
  }
});

export default PostMediaTwitterVideo;
