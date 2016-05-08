var React = require('react');

var PostMedia = React.createClass({

  imgElement: function(props) {
    return <img {...props} className="stream-post__media-item" />
  },

  getMedia: function() {

    if (this.props.extended_entities && this.props.extended_entities.media) {
      let media = this.props.extended_entities.media;

      return media.map(function(media, index) {
        return this.imgElement({ key: index, src: media.media_url});
      });

    } else if (this.props.media && this.props.media.media_url) {
      let media = this.props.media;

      return media.map(function(media, index) {
        return this.imgElement({ key: index, src: media.media_url});
      });

    } else {

      let media = this.props.media;
      return this.imgElement({ src: media });

    }
  },

  render: function() {

    return (
      <div className="stream-post__media">
        <a href={this.props.href}>
          { this.getMedia() }
        </a>
      </div>
    );
  }
});

module.exports = PostMedia;
