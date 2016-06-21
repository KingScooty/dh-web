import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import { requestPosts, fetchPosts, clearPosts } from '../../actions';
// import classNames from 'classnames';

import Post from '../../components/Post';

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//
// <ReactCSSTransitionGroup
//   transitionName="fade"
//   transitionAppear
//   transitionAppearTimeout={ 400 }
//   transitionEnter={ false }
//   transitionLeave={ false }
//   >
// </ReactCSSTransitionGroup>

const getHost = function getHost() {
  var host;

  if ((typeof window != 'undefined') && (window.location.port)) {
    host = `http://127.0.0.1:1337`;
  }
  else {
    host = '';
  }

  return host;
};


class ArchiveFeed extends React.Component {

  renderPosts() {
    return this.props.posts.map(function (post, index) {
      return <Post {...post} key={ index } />;
    });
  }

  componentDidMount() {
    this.props.fetchPosts(this.props.selectedEvent);
  }

  componentWillUnmount() {
    this.props.clearPosts();
  }

  render() {
    var posts = this.renderPosts();

    // Applying a key of the route forces the component to re-render
    // from scratch. We lose animation from this node down, so we take care of
    // it a bit differently. Needs a react transition to fade on tear down.
    return (
      <div>
        { posts }
      </div>
    );
  }
}

var mapStateToProps = function (state) {
  console.log('ARCHIVE FEED');
  return {
    selectedEvent: state.events.selectedEvent,
    posts: state.events.posts
  };
};

var mapDispatchToProps = dispatch => {
  return {
    clearPosts: () => {
      dispatch(clearPosts());
    },
    fetchPosts: event => {
      dispatch(fetchPosts(event));
    }
  };
};

ArchiveFeed.propTypes = {
  selectedEvent: React.PropTypes.string.isRequired,
  posts: React.PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchiveFeed);
