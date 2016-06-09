import React from 'react';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

  getImgRatio: function (size) {
    
  },

  imgElement: function (media) {
    return media.map((media, index) => {
      var height;

      if (media.sizes && media.sizes.large && media.sizes.large.h) {
        height = media.sizes.large.h;
      }

      return (
        <div className="stream-post__media-item" key={ index }>
          <a href={ this.props.href }>
            <LazyLoad height={ height } offset={ 500 }>
              <ReactCSSTransitionGroup
                transitionName="fade"
                transitionAppear={ true }
                transitionAppearTimeout={ 300 }
                transitionEnter={ false }
                transitionLeave={ false }
                >
                <img src={ media.media_url } />
              </ReactCSSTransitionGroup>
            </LazyLoad>
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
