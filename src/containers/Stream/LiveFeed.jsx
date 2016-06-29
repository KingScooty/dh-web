import React from 'react';
import { connect } from 'react-redux';
import ioClient from 'socket.io-client';
import { toggleStatus } from '../../actions';

import Post from '../../components/Post';

var socket;

var LiveFeed = React.createClass({
  propTypes: {
    toggleStatus: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      posts: []
    };
  },

  componentDidMount: function () {
    this.connectToSockets();
    // this.props.toggleStatus(true);
  },

  componentWillUnmount: function () {
    socket.close();
    socket.removeListener('connect');
    socket.removeListener('incomingTweet');
    socket.removeListener('disconnect');
    // this.props.toggleStatus(false);
  },

  getLocation: function () {
    var location;
    if ((typeof window != 'undefined') && (window.location.port)) {
      location = 'http://localhost:1337';
    }
    else location = '';

    return location;
  },

  connectToSockets: function () {
    if (!socket) {
      socket = ioClient.connect(
        this.getLocation(),
        { path: '/api/sockets' }
      );
    }
    else {
      socket.connect(
        this.getLocation(),
        { path: '/api/sockets' }
      );
    }

    socket.on('connect', () => {
      console.log('Socket connected');
      this.props.toggleStatus(true);
    });

    socket.on('incomingTweet', (post) => {
      console.log('INCOMING EVENT: ', post);

      var postCollection = this.state.posts.slice();
      postCollection.push(post);

      this.setState({posts: postCollection.reverse()});
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.props.toggleStatus(false);
    });
  },

  renderPosts() {
    return this.state.posts.map(function (post, index) {
      return <Post {...post} key={ index } />;
    });
  },

  render: function () {
    var posts = this.renderPosts();
    return (
      <div>
        { posts }
      </div>
    );
  }
});

var mapDispatchToProps = (dispatch) => {
  return {
    toggleStatus: (liveStatus) => {
      dispatch(toggleStatus(liveStatus));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LiveFeed);
