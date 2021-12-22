import { fetch } from "./csrf";

const initialState = { user: null };

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const UPDATE_USER = "session/updateUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: user,
  };
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });

  if (response.ok) {
    dispatch(setUser(response.data.user));
    return response;
  }
};

export const login = (credential, password) => async (dispatch) => {
  const response = await fetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });

  if (response.ok) {
    dispatch(setUser(response.data.user));
    return response;
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/session", {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeUser());
    return response;
  }
};

export const restoreUser = () => async (dispatch) => {
  const res = await fetch("/api/session");
  dispatch(setUser(res.data.user));
  return res;
};

export const updateProfilePicture =
  (userId, profilePicture) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/profile_picture`, {
      method: "PUT",
      body: JSON.stringify({ profilePicture }),
    });

    if (response.ok) {
      return dispatch(updateUser(response.data.updatedUser));
    }
  };

export const updateSessionUser = (userId, user) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });

  if (res.ok) {
    console.log(res.data);
    return dispatch(updateUser(res.data.user));
  }
};

const sessionReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case UPDATE_USER:
      newState = { ...state, user: action.payload };
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
