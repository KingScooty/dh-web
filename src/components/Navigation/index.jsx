import React from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { fetchEventIfNeeded } from '../../actions';

import LiveIndicator from '../../containers/LiveIndicator';

if (typeof window !== 'undefined') {
  require('./sass/main.scss');
}

var Navigation = React.createClass({

  // handleClick: function(name) {
  //   if (window._gs) {
  //     // console.log(event);
  //     _gs('event', 'Toggle event ' + name, {
  //       extra: 'event',
  //       details: true
  //     });
  //   }
  // },

  // onClickHandler: function (event) {
  //   // e.stopPropagation();
  //   // e.preventDefault();
  //
  //
  //   console.log('On click handler has been triggered for', event);
  //   this.props.fetchEventIfNeeded(event);
  // },
  shouldComponentUpdate: function (nextProps) {
    return nextProps.selectedEvent !== this.props.selectedEvent;
  },

  render: function () {
    return (
      <div className="HUD">
        <div className="container">


              <LiveIndicator />



              <ul className="stream-navigation gs-o-list-inline gs-o-list-inline--spaced">
                <li className="stream-navigation__item">
                  <Link activeClassName="active" to="/2016">2016</Link>
                </li>
                <li className="stream-navigation__item">
                  <Link activeClassName="active" to="/halloween15">Halloween ’15</Link>
                </li>
                <li className="stream-navigation__item">
                  <Link activeClassName="active" to="/2015">2015</Link>
                </li>
                <li className="stream-navigation__item">
                  <Link activeClassName="active" to="/2014">2014</Link>
                </li>
                <li className="stream-navigation__item">
                  <Link activeClassName="active" to="/2013">2013</Link>
                </li>
                <li className="stream-navigation__item">
                  <Link activeClassName="active" to="/2012">2012</Link>
                </li>
              </ul>


        </div>
      </div>
    );
  }
});

var mapDispatchToProps = dispatch => {
  return {
    fetchEventIfNeeded: event => {
      dispatch(fetchEventIfNeeded(event));
    }
  };
};

var mapStateToProps = state => {
  // console.log(state.events.selectedEvent);
  return {
    selectedEvent: state.events.selectedEvent
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps// ,
  // null,
  // {
  //   pure: false
  // }
)(Navigation);
