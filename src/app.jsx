'use strict';

import React from 'react';
// var Home = require('./containers/Home');

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node // .isRequired
  },

  render: function () {
    return (
      <div id="app" className="typeset">
        { this.props.children }
        { /* <Home posts={this.props.posts} /> */ }
      </div>
    );
  }
});

export default App;
