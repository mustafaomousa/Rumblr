import { fetch } from "./csrf";

const LOAD = "post/getAllPosts";
const LOAD_TAGS = "post/getAllTags";
const LOAD_TAG_POSTS = "post/LOAD_TAG_POSTS";
const LOAD_RERUMBLES = "post/LOAD_RERUMBLES";

const getAllTags = (tags) => {
  return {
    type: LOAD_TAGS,
    payload: tags,
  };
};

const getAllPosts = (posts) => {
  return {
    type: LOAD,
    payload: posts,
  };
};

const getTagPosts = (tagPosts) => {
  return {
    type: LOAD_TAG_POSTS,
    payload: tagPosts,
  };
};

const getAllRerumbles = (rerumbles) => {
  return {
    type: LOAD_RERUMBLES,
    payload: rerumbles,
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
      dispatch(getTags());
    }
  };

export const deletePost =
  ({ postId }) =>
  async (dispatch) => {
    const response = await fetch(`/api/posts`, {
      method: "DELETE",
      body: JSON.stringify({ postId }),
    });

    if (response.ok) {
      dispatch(getPosts());
    }
  };

export const getRerumbles = () => async (dispatch) => {
  const response = await fetch("/api/posts/rerumble");

  if (response.ok) {
    dispatch(getAllRerumbles(response.data.rerumbles));
  }
};

export const removeRerumble =
  ({ userId, postId }) =>
  async (dispatch) => {
    const response = await fetch("/api/posts/rerumble", {
      method: "DELETE",
      body: JSON.stringify({ userId, postId }),
    });

    if (response.ok) {
      dispatch(getRerumbles());
    }
  };

export const createRerumble =
  ({ userId, postId }) =>
  async (dispatch) => {
    const response = await fetch("/api/posts/rerumble", {
      method: "POST",
      body: JSON.stringify({ userId, postId }),
    });

    if (response.ok) {
      dispatch(getRerumbles());
    }
  };

export const getTags = () => async (dispatch) => {
  const response = await fetch(`/api/posts/tags`);

  if (response.ok) {
    dispatch(getAllTags(response.data.tags));
  }
};

export const getRecentTagPosts = (tagName) => async (dispatch) => {
  const response = await fetch(`/api/posts/${tagName}`);
  if (response.ok) {
    dispatch(getTagPosts(response.data.tagPosts));
  }
};

export const getPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts");
  if (response.ok) {
    dispatch(getAllPosts(response.data.posts));
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
    dispatch(getPosts());
    return response;
  }
};

const initialState = { allPosts: [], tagPosts: [], rerumbles: [] };

const postReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD:
      newState = Object.assign({}, state, { allPosts: action.payload });
      return newState;
    // case LOAD_TAG_POSTS:
    //   newState = Object.assign({}, state, { tagPosts: action.payload });
    //   return newState;
    // case LOAD_TAGS:
    //   newState = Object.assign({}, state, { tags: action.payload });
    //   return newState;
    // case LOAD_RERUMBLES:
    //   newState = Object.assign({}, state, { rerumbles: action.payload });
    //   return newState;
    default:
      return state;
  }
};

export default postReducer;
