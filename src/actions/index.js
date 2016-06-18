import fetch from 'isomorphic-fetch';

// @TODO INCLUDE ERROR HANDLING

import { TOGGLE_STATUS, REQUEST_EVENT, RECEIVE_EVENT } from '../constants/ActionTypes';

/*
 * action creators
 */

export function toggleStatus(liveStatus) {
  return {
    type: TOGGLE_STATUS,
    isLive: liveStatus
  };
}

export function requestEvent(event) {
  return {
    type: REQUEST_EVENT,
    event
  };
}

export function receiveEvent(event, json) {
  return {
    type: RECEIVE_EVENT,
    event,
    eventInfo: json.eventInfo,
    fetchedPostCount: json.eventPosts.length,
    // posts: json.eventPosts.map(post => post.value)
    posts: json.eventPosts
  };
}

// @TODO: Needs error checking tests
// @TODO: Still doesn't work on iOS Safari

export function fetchEvent(event) {
  return dispatch => {
    dispatch(requestEvent(event));
    var host;
    const VIRTUAL_HOST = process.env.VIRTUAL_HOST;

    if (VIRTUAL_HOST) {
      host = `http://${VIRTUAL_HOST}`;
    }
    else if ((typeof window != 'undefined') && (window.location.port)) {
      host = `http://127.0.0.1:1337`;
    }
    else {
      host = '';
    }

    return fetch(`${host}/api/events/${event}`)
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then(function (response) {
      return {
        eventInfo: response.body.info[0],
        eventPosts: response.body.tweet
      };
    })
    .then(function (eventObject) {
      dispatch(receiveEvent(event, eventObject));
    });
  };
}

export function shouldFetchEvent(state, event) {
  if (state.isFetching) return false;
  return true;
}

export function fetchEventIfNeeded(event) {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    if (shouldFetchEvent(getState(), event)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchEvent(event));
    }
    else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}
