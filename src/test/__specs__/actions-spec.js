/* eslint-env node, mocha */

import { expect } from 'chai';

import * as actions from '../../actions';
import * as types from '../../constants/ActionTypes';

describe('Actions', () => {
  it('creates an action to toggle live status', () => {
    const liveStatus = true;
    const expectedAction = {
      type: types.TOGGLE_STATUS,
      isLive: liveStatus
    };
    expect(actions.toggleStatus(liveStatus)).to.deep.equal(expectedAction);
  });

  it('creates an action to request events', () => {
    const event = '2016';
    const expectedAction = {
      type: types.REQUEST_EVENT,
      event
    };
    expect(actions.requestEvent(event)).to.deep.equal(expectedAction);
  });

  it('creates an action to receive events', () => {
    const event = '2016';
    const json = {
      eventInfo: {
        type: 'info',
        html: '<div>Event Info</div>'
      },
      eventPosts: [
        {
          text: 'some tweet text',
          type: 'tweet'
        },
        {
          text: 'some more tweet text',
          type: 'tweet'
        }
      ]
    };

    const expectedAction = {
      type: types.RECEIVE_EVENT,
      event: '2016',
      eventInfo: json.eventInfo,
      fetchedPostCount: 2,
      posts: [
        {
          text: 'some tweet text',
          type: 'tweet'
        },
        {
          text: 'some more tweet text',
          type: 'tweet'
        }
      ]
    };
    expect(actions.receiveEvent(event, json)).to.deep.equal(expectedAction);
  });
});
