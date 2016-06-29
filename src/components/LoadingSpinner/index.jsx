import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

if (typeof window !== 'undefined') {
  require('./sass/main.scss');
}

class LoadingSpinner extends React.Component {
  render() {
    var loadingSpinnerClasses = classNames(
      'loader',
      {
        'loader--active': this.props.isFetching
      }
    );
    console.log('ISVISIBLE:', this.props.isFetching);

    return <div className={ loadingSpinnerClasses }>Loading...</div>;
  }
}

LoadingSpinner.propTypes = {
  isFetching: React.PropTypes.bool.isRequired
};

var mapStateToProps = state => {
  console.log('isFETCHING: ', state.events.isFetching);
  return {
    isFetching: state.events.isFetching
  };
};

export default connect(
  mapStateToProps,
)(LoadingSpinner);

// export default LoadingSpinner;
