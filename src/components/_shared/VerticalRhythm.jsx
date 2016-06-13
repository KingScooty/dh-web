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

  setWrapperRef(el) {
    console.log(el);
    this.wrapper = el;
  }

  componentDidMount() {
    const height = this.wrapper.clientHeight;
    this.handleVerticalRhythm(height);
  }

  // componentDidUpdate() {
  //   const height = this.wrapper.clientHeight;;
  //
  //   if (height !== this.state.height) {
  //     this.setState({height}, () => {
  //       this.props.onHeightReady(this.state.height);
  //     });
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    const height = this.wrapper.clientHeight;
    if (nextProps.isFetching === false && this.props.isFetching === true) {
      this.handleVerticalRhythm(height);
    }
  }

  // componentDidMount() {
  //   console.log('forcing re-render');
  //   this.forceUpdate();
  // }

  render() {
    const styles = {
      height: this.state.height
    };

    // <ReactHeight onHeightReady={ height => this.handleVerticalRhythm(height) } style={ styles }>

    return (
      <div ref={ this.setWrappedRef } style={ styles }>
        { this.props.children }
      </div>
    );
  }
}

VerticalRhythm.propTypes = {
  children: PropTypes.node.isRequired
};

// VerticalRhythm.contextTypes = {
//   router: React.PropTypes.func.isRequired
// };

// VerticalRhythm.defaultProps = {
//   height: 'auto'
// };

export default VerticalRhythm;
