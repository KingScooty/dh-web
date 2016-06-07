import React from 'react';
import marked from 'marked';

var EventInfo = React.createClass({
  propTypes: {
    titleLead: React.PropTypes.string,
    titleSupport: React.PropTypes.string,
    body: React.PropTypes.string,
    footer: React.PropTypes.string
  },

  convertMarkdown: function (markdown) {
    var renderedMarkdown;
    if (!markdown) return false;

    renderedMarkdown = marked(markdown, {sanitize: true});
    return {
      dangerouslySetInnerHTML: {
        __html: renderedMarkdown
      }
    };
  },

  render: function () {
    const getEventBody = this.convertMarkdown(this.props.body);
    const { titleLead, titleSupport, footer } = this.props;
    // const titleSupport = this.props.titleSupport;
    // const footer = this.props.footer;

    return (
      <div className="event">

        <div className="event__header">
          <h1 className="lead-title">{ titleLead }</h1>
          <h2 className="support-title">{ titleSupport }</h2>
        </div>

        <hr className="section-spacer" />

        <div className="event__body" {...getEventBody} />

        <div className="event__footer">
          <hr />
          <h2 className="island-title">{ footer }</h2>
          <hr />
        </div>
      </div>
    );
  }
});

export default EventInfo;
