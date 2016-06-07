import React from 'react';
import { connect } from 'react-redux';

import LiveIndicator from '../../components/LiveIndicator';

var LiveIndicatorContainer = React.createClass({
  propTypes: {
    isLive: React.PropTypes.bool.isRequired
  },

  render: function () {
    var isLive = this.props.isLive;

    return (
      <LiveIndicator isLive={ isLive } />
    );
  }
});

var mapStateToProps = function (state) {
  // return { isLive: state.isLive };
  console.log('INDICATOR CONTAINER');
  return { isLive: state.events.isLive };
  // console.log(state.get('isLive'));
  // return { isLive: state.get('isLive') };
};

export default connect(
  mapStateToProps
)(LiveIndicatorContainer);
