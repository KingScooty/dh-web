import React, { Component, PropTypes } from 'react';

/**
 * Wraps a component with a responsive image div if a width and height are
 * provided.
 *
 * Could this be turned into a proper ES7 decorator going forward??
 */

const getImgRatio = function getImgRatio(width, height) {
  return 100 / (width / height);
};

const responsiveImageWrapper = function responsiveImageWrapper(width, height, children) {
  return (
    <div
      style={
        { paddingBottom: `${getImgRatio(width, height)}%` }
      }
      className="gs-o-responsive-image"
      >
      { children }
    </div>
  );
};

class ResponsiveImage extends Component {
  render() {
    if (this.props.medium) {
      return responsiveImageWrapper(
        this.props.medium.w,
        this.props.medium.h,
        this.props.children
      );
    }
    else {
      return this.props.children;
    }
  }
}

ResponsiveImage.propTypes = {
  medium: PropTypes.shape({
    w: PropTypes.number,
    h: PropTypes.number
  }),
  children: PropTypes.node.isRequired
};

export default ResponsiveImage;
