import { fetch } from "./csrf";

const LOAD_POSTS = "post/getAllPosts";
const ADD_POST = "post/createNewPost";
const DELETE_POST = "post/deletePost";
const UPDATE_POST = "post/updatePost";
const ADD_LIKE = "post/likePost";
const DELETE_LIKE = "post/dislikePost";
const LOAD_RANDOM_POST = "post/loadRandomPost";

const getAllPosts = (posts) => {
  return {
    type: LOAD_POSTS,
    payload: posts,
  };
};

const loadRandomPost = (post) => {
  return {
    type: LOAD_RANDOM_POST,
    payload: post,
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

const likePost = (like) => {
  return {
    type: ADD_LIKE,
    payload: like,
  };
};

const dislikePost = (postId, newLikes) => {
  return {
    type: DELETE_LIKE,
    payload: { postId, newLikes },
  };
};

export const getRandomPost = () => async (dispatch) => {
  const response = await fetch("/api/posts/random");

  if (response.ok) {
    return dispatch(loadRandomPost(response.data.randomPost));
  }
};

export const updatePost =
  ({ postId, body }) =>
  async (dispatch) => {
    const response = await fetch(`/api/posts`, {
      method: "PUT",
      body: JSON.stringify({ postId, body }),
    });

    if (response.ok) {
      dispatch(updateUserPost(response.data.updatedPost));
    }
    return response;
  };

export const likeUserPost = (postId, userId) => async (dispatch) => {
  const response = await fetch("/api/likes", {
    method: "POST",
    body: JSON.stringify({ postId, userId }),
  });

  if (response.ok) {
    dispatch(likePost(response.data.like));
  }
};

export const removeLike = (like) => async (dispatch) => {
  const response = await fetch("/api/likes", {
    method: "DELETE",
    body: JSON.stringify({ likeId: like.id }),
  });

  if (response.ok) {
    dispatch(dislikePost(like.postId, response.data.newLikes));
  }
};

export const deletePost =
  ({ postId }) =>
  async (dispatch) => {
    await fetch(`/api/posts`, {
      method: "DELETE",
      body: JSON.stringify({ postId }),
    });

    dispatch(deleteUserPost(postId));
  };

export const getPosts = (limit) => async (dispatch) => {
  const response = await fetch(`/api/posts?limit=${limit}`);
  if (response.ok) {
    dispatch(getAllPosts(response.data));
    return response;
  }
};

export const getProfilePosts = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`);
  if (response.ok) {
    dispatch(getAllPosts(response.data.user.Posts));
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

const initialState = { loadedPosts: null, randomPost: null };

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return { ...state, loadedPosts: action.payload };
    case ADD_POST:
      return { ...state, loadedPosts: [action.payload, ...state.loadedPosts] };
    case UPDATE_POST:
      return {
        ...state,
        loadedPosts: state.loadedPosts.map((post) => {
          if (post.id !== action.payload.id) {
            return post;
          } else {
            return { ...post, ...action.payload };
          }
        }),
        randomPost:
          state.randomPost && state.randomPost.id === action.payload.id
            ? { ...state.randomPost, ...action.payload }
            : { ...state.randomPost },
      };
    case DELETE_POST:
      return {
        ...state,
        loadedPosts: state.loadedPosts.filter(
          (post) => post.id !== action.payload
        ),
      };
    case ADD_LIKE:
      return {
        ...state,
        loadedPosts: state.loadedPosts.map((post) => {
          if (post.id !== action.payload.postId) {
            return post;
          } else {
            return {
              ...post,
              Likes: [...post.Likes, action.payload],
              Liked: true,
            };
          }
        }),
        randomPost:
          state.randomPost && state.randomPost.id === action.payload.postId
            ? {
                ...state.randomPost,
                Likes: [...state.randomPost.Likes, action.payload],
                Liked: true,
              }
            : { ...state.randomPost },
      };
    case DELETE_LIKE:
      console.log(action.payload.postId);
      return {
        ...state,
        loadedPosts: state.loadedPosts.map((post) => {
          if (post.id !== action.payload.postId) {
            return post;
          } else {
            return {
              ...post,
              Likes: action.payload.newLikes,
              Liked: false,
            };
          }
        }),
        randomPost:
          state.randomPost && state.randomPost.id === action.payload.postId
            ? {
                ...state.randomPost,
                Likes: action.payload.newLikes,
                Liked: false,
              }
            : { ...state.randomPost },
      };
    case LOAD_RANDOM_POST:
      return {
        ...state,
        randomPost: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
