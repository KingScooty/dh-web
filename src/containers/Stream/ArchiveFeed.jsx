import React from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post';

class ArchiveFeed extends React.Component {
  renderPosts() {
    return this.props.posts.map(function (post, index) {
      return <Post {...post} key={ index } isFetching={ this.props.isFetching } />;
    }.bind(this));
  }

  render() {
    var posts = this.renderPosts();

    return (
      <div>
        <h1>ARCHIVE FEED!!</h1>
        { posts }
      </div>
    );
  }
}

var mapStateToProps = function (state) {
  // return { posts: state.posts};
  console.log('ARCHIVE FEED');
  // console.log(state);
  // console.log(state.get('posts').toJS()[0]);
  // return { posts: state.get('posts').toJS() };
  return {
    selectedEvent: state.events.selectedEvent,
    isFetching: state.events.isFetching,
    posts: [state.events.posts[0]]
  };
};

ArchiveFeed.propTypes = {
  isFetching: React.PropTypes.bool,
  posts: React.PropTypes.array.isRequired
};

// module.exports = provideHooks(hooks)(connect(mapStateToProps)(ArchiveFeed));
export default connect(mapStateToProps)(ArchiveFeed);
