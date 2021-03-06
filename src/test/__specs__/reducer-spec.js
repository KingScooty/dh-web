/* eslint-env node, mocha */

import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import { default as reducer, initialState } from '../../reducers';
import * as types from '../../constants/ActionTypes';

describe('Reducer', () => {
  it('should return the initial state', () => {
    const initialReducerState = reducer(undefined, {});
    expect(initialReducerState).to.deep.equal(initialState);
  });

  it('handles TOGGLE_STATUS', () => {
    const action = {
      type: types.TOGGLE_STATUS,
      isLive: true
    };

    const nextState = reducer(initialState, action);
    expect(nextState.isLive).to.equal(true);
  });

  it('handles REQUEST_EVENT', () => {
    const action = {
      type: types.REQUEST_EVENT,
      event: '2015'
    };

    const nextState = reducer(initialState, action);

    expect(nextState.selectedEvent).to.equal('2015');
    // expect(nextState.isFetching).to.equal(true);
  });

  it('handles RECEIVE_EVENT', () => {
    const expectedEventObject = {
      event: '2016',
      eventInfo: {
        type: 'info',
        html: '<div>Event Info</div>'
      }//,
      // posts: [{
      //   text: 'some tweet text',
      //   type: 'tweet'
      // }]
    };

    const action = {
      type: types.RECEIVE_EVENT,
      event: '2015',
      // fetchedPostCount: 1,
      eventInfo: expectedEventObject.eventInfo,
      // posts: expectedEventObject.posts
    };

    const customInitialState = {
      ...initialState,
      isLive: true
    };

    const nextState = reducer(customInitialState, action);

    expect(nextState.isFetching).to.equal(false);
    expect(nextState.eventInfo).to.equal(expectedEventObject.eventInfo);
    // expect(nextState.fetchedPostCount).to.equal(1);
    // expect(nextState.posts).to.equal(expectedEventObject.posts);
  });
});
