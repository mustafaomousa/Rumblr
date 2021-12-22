import { fetch } from "./csrf";

const LOAD = "user/getUser";
const UPDATE = "user/updateUser";

const getProfileUser = (user) => {
  return {
    type: LOAD,
    payload: user,
  };
};

export const getUserProfile = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`);

  if (response.ok) {
    dispatch(getProfileUser(response.data.user));
  }
};

const initialState = { profile_user: {} };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      state.profile_user = { ...action.payload };
      return state;
    case UPDATE:
      state.profile_user = { ...state.profile_user, ...action.payload };
      return state;
    default:
      return state;
  }
};

export default userReducer;
