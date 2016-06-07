import React from 'react';
import classNames from 'classnames';

var LiveIndicator = React.createClass({
  propTypes: {
    isLive: React.PropTypes.bool.isRequired
  },

  render: function () {
    var statusText = this.props.isLive ? 'LIVE' : 'Offline';
    var statusClass = classNames(
      'live-indicator__status',
      {
        'dh-c-red': !this.props.isLive,
        'dh-c-green': this.props.isLive
      }
    );

    return (
      <div className="live-indicator">
        Stream <span className={ statusClass }>{ statusText }</span>
      </div>
    );
  }
});

export default LiveIndicator;
