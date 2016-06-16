'use strict';

import React from 'react';
// var Home = require('./containers/Home');

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node // .isRequired
  },

  render: function () {
    return this.props.children;
  }
});

export default App;
