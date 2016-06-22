import fetch from 'isomorphic-fetch';

// @TODO INCLUDE ERROR HANDLING

import {
  TOGGLE_STATUS, REQUEST_EVENT, RECEIVE_EVENT,
  REQUEST_POSTS, RECEIVE_POSTS, CLEAR_POSTS
} from '../constants/ActionTypes';

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

export function receiveEvent(event, eventInfo) {
  return {
    type: RECEIVE_EVENT,
    event,
    eventInfo: eventInfo//,
    // fetchedPostCount: json.eventPosts.length,
    // posts: json.eventPosts.map(post => post.value)
    // posts: json.eventPosts
  };
}

export function requestPosts(event) {
  return {
    type: REQUEST_POSTS,
    event
  };
}

export function receivePosts(event, posts) {
  return {
    type: RECEIVE_POSTS,
    event,
    // fetchedPostCount: json.eventPosts.length,
    // posts: json.eventPosts
    fetchedPostCount: posts.length,
    posts: posts
  };
}


function getHost() {
  const VIRTUAL_HOST = process.env.VIRTUAL_HOST;
  var host;

  if (VIRTUAL_HOST) {
    host = `http://${VIRTUAL_HOST}`;
  }
  else if ((typeof window != 'undefined') && (window.location.port)) {
    host = `http://127.0.0.1:1337`;
  }
  else {
    host = '';
  }

  return host;
}

// @TODO: Needs error checking tests
// @TODO: Still doesn't work on iOS Safari

export function fetchEvent(event) {
  return dispatch => {
    dispatch(requestEvent(event));
    var host = getHost();

    return fetch(`${host}/api/events/${event}/info`)
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then(function (response) {
      dispatch(receiveEvent(event, response.body[0]));
    });
  };
}

// @TODO: NEEDS TESTS!!

export function clearPosts() {
  return {
    type: CLEAR_POSTS,
    fetchedPostCount: 0,
    posts: []
  };
}

// @TODO: NEEDS TESTS!!

function fetchFromAPI(endPoint, event, dispatch) {
  return fetch(endPoint)
  .then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then(response => {
    dispatch(receivePosts(event, response.body));
  });
}

// @TODO: NEEDS TESTS!!

export function fetchPosts(event) {
  return dispatch => {
    dispatch(requestPosts(event));
    const host = getHost();
    const endPoint = `${host}/api/events/${event}/tweets`;
    fetchFromAPI(endPoint, event, dispatch);
  };
}

export function shouldFetchEvent(state) {
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
