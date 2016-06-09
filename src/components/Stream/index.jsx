import React from 'react';
import LiveIndicator from '../../containers/LiveIndicator';
import Navigation from '../Navigation';

var Stream = React.createClass({
  propTypes: {
    live: React.PropTypes.node,
    archive: React.PropTypes.node.isRequired
  },

  render: function () {
    var { live, archive } = this.props;

    return (
      <div id="stream" className="stream">
        <div className="stream__header">

          <LiveIndicator />

          <Navigation />
        </div>

        <div className="stream__body">
          <div className="stream__body-wrapper">
            { live }
            { archive }
          </div>
        </div>
      </div>
    );
  }
});

export default Stream;
