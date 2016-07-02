import React from 'react';
import classNames from 'classnames';

import * as mediaHelpers from './mediaHelpers';
import PostMediaTwitter from './PostMediaTwitter';
import PostMediaInstagram from './PostMediaInstagram';

const PostMedia = React.createClass({
  propTypes: {
    entities: React.PropTypes.shape({
      urls: React.PropTypes.array.isRequired,
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
    // media: React.PropTypes.string,
    href: React.PropTypes.string
  },

  instagram: function () {
    const images = mediaHelpers.isInstagram(this.props.entities.urls);
    if (!images.length) return;

    const shortcodes = mediaHelpers.getShortKeys(images);
    return shortcodes.map(function (shortcode, index) {
      return <PostMediaInstagram shortcode={ shortcode } key={ index } />;
    });
  },

  render: function () {
    // const media = this.getMedia();
    // if (!media) return false;

    // Need to hide this media div if there is no media!!
    return (
      <div className="stream-post__media">
        <PostMediaTwitter
          entities={ this.props.entities }
          extended_entities={ this.props.extended_entities }
          href={ this.props.href }
          />
          { this.instagram() }
      </div>
    );
  }
});

export default PostMedia;
