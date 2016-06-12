import React from 'react';
import classNames from 'classnames';
import PostMediaImage from './PostMediaImage';
import ReactHeight from 'react-height';

// var calculateRhythm = function calculateRhythm(height) {
//   var bodyFontSizePx = getComputedStyle(document.body).getPropertyValue('font-size');
//   var bodyLineHeightPx = getComputedStyle(document.body).getPropertyValue('line-height');
//   var bodyLineHeightRem = bodyLineHeightPx / bodyFontSizePx;
//
//   var baseline = bodyLineHeightPx / 2;
//   var remainder = height % baseline;
//   var invertRemainder = baseline - remainder;
// };

var PostMedia = React.createClass({
  propTypes: {
    entities: React.PropTypes.shape({
      media: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          media_url: React.PropTypes.string.isRequired
        })
      )
    }),
    extended_entities: React.PropTypes.shape({
      media: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          media_url: React.PropTypes.string.isRequired
        })
      )
    }),
    media: React.PropTypes.string,
    href: React.PropTypes.string
  },

  // <ReactHeight onHeightReady={ height => console.log(height) } key={ index }>
  // </ReactHeight>

  imgElement: function (media) {
    return media.map((media, index) => {
      return (
        <div className="stream-post__media-item" key={ index }>
          <a href={ this.props.href }>
            <PostMediaImage {...media } />
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
    else if (this.props.media) {
      return this.imgElement([{media_url: this.props.media}]);
    }
  },

  render: function () {
    const media = this.getMedia();
    if (!media) return false;

    return (
      <div className="stream-post__media">
        { media }
      </div>
    );
  }
});

export default PostMedia;
