import React, { createClass, PropTypes } from 'react';

import PostMediaTwitterPhoto from './PostMediaTwitterPhoto';
import PostMediaTwitterVideo from './PostMediaTwitterVideo';

const PostMedia = createClass({
  propTypes: {
    entities: PropTypes.shape({
      media: PropTypes.arrayOf(
        PropTypes.shape({
          media_url: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          sizes: PropTypes.object.isRequired
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

  imgElement: function imgElement(media) {
    return media.map((media, index) => {
      if (media.type === 'video') {
        return <PostMediaTwitterVideo { ...media } key={ index } />;
      }
      return <PostMediaTwitterPhoto { ...media } href={ this.props.href } key={ index } />;
    });
  },

  getMedia: function getMedia() {
    if (this.props.extended_entities &&
        this.props.extended_entities.media) {
      return this.imgElement(this.props.extended_entities.media);
    }
    else if (this.props.entities &&
             this.props.entities.media) {
      return this.imgElement(this.props.entities.media);
    }
  },

  render: function render() {
    const media = this.getMedia();
    if (!media) return false;

    return (
      <div>{ media }</div>
    );
  }
});

export default PostMedia;
