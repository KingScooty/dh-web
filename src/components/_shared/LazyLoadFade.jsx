import React from 'react';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class LazyLoadFade extends React.Component {
  render() {
    return (
      <LazyLoad offset={ 500 }>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppear
          transitionAppearTimeout={ 300 }
          transitionEnter={ false }
          transitionLeave={ false }
          >
          { this.props.children }
        </ReactCSSTransitionGroup>
      </LazyLoad>
    );
  }
}

LazyLoadFade.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default LazyLoadFade;
