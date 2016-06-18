import React from 'react';
import marked from 'marked';

if (typeof window !== 'undefined') {
  require('./sass/main.scss');
}

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
          <hr className="section-spacer section-spacer--compact" />
          <h2 className="support-title" dangerouslySetInnerHTML={{__html: titleSupport }} />
          <hr className="section-spacer section-spacer--compact" />
        </div>

        {/*<hr className="section-spacer section-spacer--compact" />*/}

        <div className="event__body" {...getEventBody} />

        <div className="event__footer">
          <hr className="section-spacer" />
          <div>
          <div className="island-title">{ footer }</div>
          </div>
          <hr className="section-spacer" />
        </div>
      </div>
    );
  }
});

export default EventInfo;
