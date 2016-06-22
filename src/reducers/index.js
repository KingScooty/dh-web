import {
  TOGGLE_STATUS, REQUEST_EVENT, RECEIVE_EVENT,
  REQUEST_POSTS, RECEIVE_POSTS, CLEAR_POSTS
} from '../constants/ActionTypes';

export const initialState = {
  selectedEvent: 'halloween15',
  isLive: false,
  isFetching: false,
  eventInfo: {},
  fetchedPostCount: 0,
  posts: []
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_STATUS:
      return {
        ...state,
        isLive: action.isLive
      };
    case REQUEST_EVENT:
      return {
        ...state,
        selectedEvent: action.event,
        isFetching: true
      };
    case RECEIVE_EVENT:
      // console.log('REDUCER RECEIVED EVENT!');
      return {
        ...state,
        isFetching: false,
        eventInfo: action.eventInfo// ,
        // fetchedPostCount: action.fetchedPostCount,
        // posts: action.posts
        // posts: [] // remove
      };
    case CLEAR_POSTS:
      return {
        ...state,
        fetchedPostCount: action.fetchedPostCount,
        posts: action.posts
      };
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true // needs tweaking
      };
    case RECEIVE_POSTS:
      // console.log('REDUCER RECEIVED POSTS');
      return {
        ...state,
        isFetching: false,
        fetchedPostCount: action.fetchedPostCount,
        posts: action.posts
      };
    default:
      return state;
  }
};

export default events;
