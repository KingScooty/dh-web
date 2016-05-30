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

export function fetchEvent(event) {
  return async dispatch => {
    dispatch(requestEvent(event));

    var host;

    console.log('LETS DO DIS PUNKS!');
    if (process.env.NODE_ENV === 'production') {
      host = 'http://digital-heroes.com';
    }
    else if (process.env.BUILD_ENV === 'int') {
      host = 'http://int.digital-heroes.com'
    }
    else {
      host = 'http://localhost:1337';
    }

    const eventInfo = await fetch(`${host}/api/events/${event}/info`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      });

    const eventPosts = await fetch(`${host}/api/events/${event}/tweets`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      });

    const eventObject = {
      eventInfo: eventInfo.body,
      eventPosts: eventPosts.body
    };

    console.log('ACTION FINISHED');
    return dispatch(receiveEvent(event, eventObject));
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

  return(dispatch, getState) => {
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
