import React from 'react';
import classNames from 'classnames';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import Breakjs from 'breakjs';

var calculateRhythm = function calculateRhythm(height) {
  // window.$ = document.querySelectorAll.bind(document);
  var bodyFontSizePx = getComputedStyle(document.body).getPropertyValue('font-size');
  var bodyLineHeightPx = getComputedStyle(document.body).getPropertyValue('line-height');
  var bodyLineHeightRem = bodyLineHeightPx / bodyFontSizePx;

  var baseline = bodyLineHeightPx / 2;
  var remainder = height % baseline;
  var invertRemainder = baseline - remainder;
};

// var layout = Breakjs({
//   mobile: 0,
//   phablet: 640,
//   tablet: 800,
//   desktop: 1024,
//   wide: 1600
// });

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

  // getInitialState: function () {
  //   return {layout: layout.current()};
  // },
  // componentDidMount: function () {
  //   layout.addChangeListener(this.onLayoutChange);
  // },
  // componentWillUnmount: function () {
  //   layout.removeChangeListener(this.onLayoutChange);
  // },
  // onLayoutChange: function (layout) {
  //   this.setState({layout: layout});
  // },

  // There are way more ratios than these.
  // 1by1, and some weird android sizes.
  getImgRatio: function (media) {
    var width;
    var height;

    if (media.sizes && media.sizes.large) {
      width = media.sizes.large.w;
      height = media.sizes.large.h;

      return 100 / (width / height);
    }
  },

  lazyLoadWrapper: function (img) {
    return (
      <LazyLoad offset={ 500 }>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppear
          transitionAppearTimeout={ 300 }
          transitionEnter={ false }
          transitionLeave={ false }
          >
          { img }
        </ReactCSSTransitionGroup>
      </LazyLoad>
    );
  },

  // These should be separate react component classes in the same file.
  responsiveImgWrapper: function (media) {
    var classes = classNames(
      'gs-o-responsive-image'
    );
    var styles = {
      paddingBottom: `${this.getImgRatio(media)}%`
    };

    var img = <img src={ media.media_url } />;

    return (
      <div style={ styles } className={ classes }>
        { this.lazyLoadWrapper(img) }
      </div>
    );
  },

  imgElement: function (media) {
    return media.map((media, index) => {
      var img;
      if (media.sizes) {
        img = this.responsiveImgWrapper(media);
      }
      else {
        img = <img src={ media.media_url } />;
      }
      return (
        <div className="stream-post__media-item" key={ index }>
          <a href={ this.props.href }>
            { img }
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
