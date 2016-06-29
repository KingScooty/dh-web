import React from 'react';
import classNames from 'classnames';

if (typeof window !== 'undefined') {
  require('./sass/main.scss');
}

class LoadingSpinner extends React.Component {
  constructor() {
    super();
  }

  render() {
    var loadingSpinnerClasses = classNames(
      'loader',
      {
        'loader--active': this.props.isVisible
      }
    );
    return <div className={ loadingSpinnerClasses }>Loading...</div>
  }
}

LoadingSpinner.propTypes = {
  isVisible: React.PropTypes.bool
};

export default LoadingSpinner;
