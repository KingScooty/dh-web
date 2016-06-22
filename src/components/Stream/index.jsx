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

    // Applying a key of the route forces the component to re-render
    // from scratch. We lose animation from this node down, so we take care of
    // it a bit differently. Needs a react transition to fade on tear down.

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
