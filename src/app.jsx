'use strict';

import React from 'react';
// var Home = require('./containers/Home');

if (typeof window !== 'undefined') {
  require('./static/sass/main.scss');
}

var App = React.createClass({
  propTypes: {
    children: React.PropTypes.node // .isRequired
  },

  render: function () {
    return this.props.children;
  }
});

export default App;
