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
    this.state = {
      height: 'auto'
    };
  }

  handleVerticalRhythm(height) {
    this.setState({
      height: `${calculateRhythm(height)}px`
    });
  }

  render() {
    const styles = {
      height: this.state.height
    };

    return (
      <div style={ styles }>
        <ReactHeight onHeightReady={ height => this.handleVerticalRhythm(height) }>
          { this.props.children }
        </ReactHeight>
      </div>
    );
  }
}

VerticalRhythm.propTypes = {
  children: PropTypes.node.isRequired
};

export default VerticalRhythm;
