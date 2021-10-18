import { fetch } from "./csrf";

const LOAD_NEWEST_USERS = "discover/loadNewestUsers";
const LOAD_RANDOM_POST = "discover/loadRandomPost";

const loadNewestUsers = (newestUsers) => {
  return {
    type: LOAD_NEWEST_USERS,
    payload: newestUsers,
  };
};

const loadRandomPost = (randomPost) => {
  return {
    type: LOAD_RANDOM_POST,
    payload: randomPost,
  };
};

export const getNewestUsers = () => async (dispatch) => {
  const response = await fetch("/api/users/newest/");

  if (response.ok) {
    return dispatch(loadNewestUsers(response.data.newestUsers));
  }
};

export const getRandomPost = () => async (dispatch) => {
  const response = await fetch("/api/posts/random");

  if (response.ok) {
    return dispatch(loadRandomPost(response.data.randomPost));
  }
};

const initialState = { newestUsers: null, randomPost: null };

const discoverReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NEWEST_USERS:
      return { ...state, newestUsers: action.payload };
    case LOAD_RANDOM_POST:
      return { ...state, randomPost: action.payload };
    default:
      return state;
  }
};

export default discoverReducer;
