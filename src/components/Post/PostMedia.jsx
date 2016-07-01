import React from 'react';
import classNames from 'classnames';
import PostMediaTwitter from './PostMediaTwitter';

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
    // media: React.PropTypes.string,
    href: React.PropTypes.string
  },

  render: function () {
    // const media = this.getMedia();
    // if (!media) return false;

    return (
      <div className="stream-post__media">
        <PostMediaTwitter
          entities={ this.props.entities }
          extended_entities={ this.props.extended_entities }
          href={ this.props.href }
          />
      </div>
    );
  }
});

export default PostMedia;
