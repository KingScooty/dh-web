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

class ArchiveFeed extends React.Component {
  constructor() {
    super();
    this.timeout = 0;
  }

  renderPosts() {
    return this.props.posts.map(function (post, index) {
      return <Post {...post} key={ index } />;
    });
  }

  componentDidMount() {
    var fetchPosts = this.props.fetchPosts;
    var event = this.props.selectedEvent;
    console.log('Mounting pre-timeout:', this.timeout);
    this.timeout = setTimeout(fetchPosts.bind(null, event), 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.timeout = 0;
    this.props.clearPosts();
  }

  render() {
    var posts = this.renderPosts();

    return (
      <div>
        { posts }
      </div>
    );
  }
}

var mapStateToProps = function (state) {
  // console.log('ARCHIVE FEED');
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
  fetchPosts: React.PropTypes.func.isRequired,
  clearPosts: React.PropTypes.func.isRequired,
  selectedEvent: React.PropTypes.string.isRequired,
  posts: React.PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchiveFeed);
