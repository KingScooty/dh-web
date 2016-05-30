/* eslint-env node, mocha */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import nock from 'nock';
import { expect } from 'chai';

import * as actions from '../../actions';
import * as types from '../../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates RECEIVE_EVENT when fetching events has been done', () => {

    const infoPayload = {
      body: {
        type: 'info',
        html: '<div>Event Info</div>'
      }
    };

    const postsPayload = {
      body: [
        {
          text: 'some tweet text',
          type: 'tweet'
        }
      ]
    };

    const expectedInfoResponse = {
      type: 'info',
      html: '<div>Event Info</div>'
    };

    const expectedPostsResponse = [
      {
        text: 'some tweet text',
        type: 'tweet'
      }
    ];

    nock('http://127.0.0.1:1337')
      .get('/api/events/2015/info')
      .reply(200, infoPayload);

    nock('http://127.0.0.1:1337')
      .get('/api/events/2015/tweets')
      .reply(200, postsPayload);

    // Perhaps going forward this should test spies to see if the right actions
    // are being called? As the individual actions will already be tested.
    const expectedActions = [
      {
        event: '2015',
        type: types.REQUEST_EVENT
      },
      {
        type: types.RECEIVE_EVENT,
        event: '2015',
        eventInfo: expectedInfoResponse,
        fetchedPostCount: 1,
        posts: expectedPostsResponse//.map(post => post)
      }
    ];

    const store = mockStore();

    return store.dispatch(actions.fetchEvent('2015'))
      .then(() => { // return of async actions
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });
});
