import { fetch } from "./csrf";

const LOAD_NEWEST_USERS = "discover/getNewestUsers";

const loadNewestUsers = (newestUsers) => {
  return {
    type: LOAD_NEWEST_USERS,
    payload: newestUsers,
  };
};

export const getNewestUsers = () => async (dispatch) => {
  const response = await fetch("/api/users/newest/");

  if (response.ok) {
    return dispatch(loadNewestUsers(response.data.newestUsers));
  }
};

const initialState = { newestUsers: null, randomPost: null };

const discoverReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_NEWEST_USERS:
      return { ...state, newestUsers: action.payload };
    default:
      return state;
  }
};

export default discoverReducer;
