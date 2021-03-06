var React = require('react');
var ReactDOMServer = require('react-dom/server');

// var Root = require('../containers/Root');
var App = require('../app');

var Layout = require('./layout');

var index = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    posts: React.PropTypes.array.isRequired
  },

  safeStringify: function (obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
  },

  render: function () {
    var dataScript = this.safeStringify(this.props.posts);

    // render as a dynamic react component
    var appString = ReactDOMServer.renderToString(
      <App posts={ this.props.posts } />
    );

    return (
      <Layout title={ this.props.title }>

        <div id="app" dangerouslySetInnerHTML={ {__html: appString} } />

        <script charSet="utf-8" id="__INITIAL_STATE__" type="application/json" dangerouslySetInnerHTML={ {__html: dataScript} }></script>
      </Layout>
    );
  }
});

module.exports = index;
