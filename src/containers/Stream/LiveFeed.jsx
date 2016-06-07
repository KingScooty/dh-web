import React from 'react';
import { connect } from 'react-redux';
import ioClient from 'socket.io-client';
import { toggleStatus } from '../../actions';

var socket;

var LiveFeed = React.createClass({
  propTypes: {
    toggleStatus: React.PropTypes.func.isRequired
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

    socket.on('incomingTweet', (tweet) => {
      console.log('INCOMING EVENT: ', tweet);
      // var newArray = this.state.tweets.slice();
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.props.toggleStatus(false);
    });
  },

  render: function () {
    return (
      <h1>[LIVE!] FEED!</h1>
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
