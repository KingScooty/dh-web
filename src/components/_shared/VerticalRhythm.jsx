import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactHeight from 'react-height';

var calculateRhythm = function calculateRhythm(height) {
  var bodyFontSizePx = parseFloat(getComputedStyle(document.body).getPropertyValue('font-size'));
  var bodyLineHeightPx = parseFloat(getComputedStyle(document.body).getPropertyValue('line-height'));

  var baseline = bodyLineHeightPx / 2;
  var remainder = height % baseline;

  return height - remainder;
  // var invertRemainder = baseline - remainder;
};

class VerticalRhythm extends Component {
  constructor() {
    super();
    this.state = { height: 'auto' };
  }

  handleVerticalRhythm(height) {
    console.log('HANDLE HEIGHT CHANGE!', height);
    this.setState({ height: `${calculateRhythm(height)}px` });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFetching === true && this.props.isFetching === false) {
      this.setState({height: 'auto'});
    }
  }

  render() {
    const styles = {
      height: this.state.height
    };

    return (
      <ReactHeight onHeightReady={ height => this.handleVerticalRhythm(height) } style={ styles }>
        { this.props.children }
      </ReactHeight>
    );
  }
}

VerticalRhythm.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

var mapStateToProps = function (state) {
  return {
    isFetching: state.events.isFetching
  };
};

VerticalRhythm.defaultProps = {
  isFetching: true
};

export default connect(mapStateToProps)(VerticalRhythm);