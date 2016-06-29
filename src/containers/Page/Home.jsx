'use strict';

/**
 * .bg2 is just slapped in here for now. Would be nice to have this handled
 * in a more elegant way. Rather than having a script on window.load in
 * lib/reactRender.js
 */

import React from 'react';
import { connect } from 'react-redux';

import Logo from '../../components/Logo';
import EventInfo from '../../components/EventInfo';

var Home = React.createClass({
  propTypes: {
    titleLead: React.PropTypes.string,
    titleSupport: React.PropTypes.string,
    eventTag: React.PropTypes.string,
    body: React.PropTypes.string,
    footer: React.PropTypes.string,
    Stream: React.PropTypes.node.isRequired
  },

  render: function () {
    var logoProps = {
      title: this.props.titleLead,
      eventTag: this.props.eventTag
    };
    var eventInfoProps = {
      titleLead: this.props.titleLead,
      titleSupport: this.props.titleSupport,
      body: this.props.body,
      footer: this.props.footer
    };

    var Stream = this.props.Stream;

    return (
      <div>
        <div className="bg2"></div>
        <Logo {...logoProps} />
        <div className="container">
          <EventInfo {...eventInfoProps} />
          { Stream }
        </div>
      </div>
    );
  }
});

var mapStateToProps = function (state) {
  const eventInfo = state.events.eventInfo;
  return {
    titleLead: eventInfo.titleLead,
    titleSupport: eventInfo.titleSupport,
    eventTag: eventInfo.eventTag,
    body: eventInfo.body,
    footer: eventInfo.footer
  };
};

export default connect(
  mapStateToProps
)(Home);
