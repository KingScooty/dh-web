import React, { Component, PropTypes } from 'react';
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

  render() {
    const styles = {
      height: this.state.height
    };

    return (
      <ReactHeight dirty={true} onHeightReady={ height => this.handleVerticalRhythm(height) } style={ styles }>
        { this.props.children }
      </ReactHeight>
    );
  }
}

VerticalRhythm.propTypes = {
  children: PropTypes.node.isRequired
};

// VerticalRhythm.defaultProps = {
//   height: 'auto'
// };

export default VerticalRhythm;
