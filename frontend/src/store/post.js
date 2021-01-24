import { fetch } from './csrf';


const GET_POSTS = 'post/getAllPosts';

const getAllPosts = allPosts => {
    return {
        type: GET_POSTS,
        payload: allPosts,
    };
};

export const getPosts = () => async dispatch => {
    const response = await fetch('/api/posts');

    if (response.ok) {
        dispatch(getAllPosts(response.data.allPosts));
        return response;
    }
};

const initialState = { posts: null };

const postReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_POSTS:
            newState = Object.assign({}, state);
            newState.posts = action.payload;
            return newState;
        default:
            return state;
    };
};

export default postReducer;