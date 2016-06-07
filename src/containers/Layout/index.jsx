import React from 'react';

var Layout = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    children: React.PropTypes.node
  },

  render: function () {
    return (
      <html>
        <head>
          <title>{ this.props.title }</title>
          { /* <link rel="stylesheet" href="/css/main.css" /> */ }
        </head>
        <body>
          { this.props.children }
          <script src="/bundle.js"></script>
        </body>
      </html>
    );
  }
});

export default Layout;
