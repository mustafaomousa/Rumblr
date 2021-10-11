import { fetch } from "./csrf";

const LOAD_POSTS = "post/getAllPosts";
const ADD_POST = "post/createNewPost";
const DELETE_POST = "post/deletePost";
const UPDATE_POST = "post/updatePost";

const getAllPosts = (posts) => {
  return {
    type: LOAD_POSTS,
    payload: posts,
  };
};

const addNewPost = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  };
};

const deleteUserPost = (postId) => {
  return {
    type: DELETE_POST,
    payload: postId,
  };
};

const updateUserPost = (post) => {
  return {
    type: UPDATE_POST,
    payload: post,
  };
};

export const updatePost =
  ({ tags, postId, title, body }) =>
  async (dispatch) => {
    const response = await fetch(`/api/posts`, {
      method: "PUT",
      body: JSON.stringify({ tags, postId, title, body }),
    });

    if (response.ok) {
      dispatch(getPosts());
    }
  };

export const deletePost =
  ({ postId }) =>
  async (dispatch) => {
    const response = await fetch(`/api/posts`, {
      method: "DELETE",
      body: JSON.stringify({ postId }),
    });

    if (response.ok && response.data.deleted) {
      dispatch(deleteUserPost(postId));
    }
  };

export const getPosts = (limit, userId) => async (dispatch) => {
  const response = await fetch(`/api/posts?limit=${limit}&userId=${userId}`);
  if (response.ok) {
    dispatch(getAllPosts(response.data.posts));
    console.log(response.data.posts);
    return response;
  }
};

export const createNewPost = (payload) => async (dispatch) => {
  const { content, body, tags, userId } = payload;
  const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({ content, body, tags, userId }),
  });

  if (response.ok) {
    dispatch(addNewPost(response.data.newPost));
    console.log(response.data);
    return response;
  }
};

const initialState = {};

const postReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_POSTS:
      newState = { ...state };
      action.payload.map((post) => (newState["_" + post.id] = post));
      return newState;
    case ADD_POST:
      newState = Object.assign(
        { ["_" + action.payload.id]: action.payload },
        state
      );
      return newState;
    case UPDATE_POST:
      newState = { ...state };
      newState["_" + action.payload.id] = action.payload;
      return newState;
    case DELETE_POST:
      newState = { ...state };
      delete newState["_" + action.payload];
      return newState;
    default:
      return state;
  }
};

export default postReducer;
