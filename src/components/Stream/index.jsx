import React from 'react';
import { connect } from 'react-redux';

import Navigation from '../Navigation';

const Stream = React.createClass({
  propTypes: {
    live: React.PropTypes.node,
    archive: React.PropTypes.node.isRequired
  },

  // componentWillReceiveProps: function () {
  //   console.log('STREAM RECEIVED PROPS.');
  // },

  render: function () {
    var { live, archive } = this.props;
    // var pathname = this.props.location.pathname;

    return (
      <div id="stream" className="stream">
        <div className="stream__header">
          <Navigation />
        </div>

        <div className="stream__body">
          <div className="stream__body-wrapper" key={ this.props.selectedEvent }>
            { live }
            { archive }
          </div>
        </div>
      </div>
    );
  }
});

//
var mapStateToProps = function (state) {
  return {
    selectedEvent: state.events.selectedEvent
  };
};

export default connect(mapStateToProps)(Stream);

// export default Stream;
