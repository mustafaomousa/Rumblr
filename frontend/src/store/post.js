import { fetch } from './csrf';


const GET_POSTS = 'post/getAllPosts';
const CREATE_POST = 'post/createPost';


const getAllPosts = posts => {
    return {
        type: GET_POSTS,
        payload: posts,
    };
};

const createPost = newPost => {
    return {
        type: CREATE_POST,
        payload: newPost
    }
}

export const getPosts = () => async dispatch => {
    const response = await fetch('/api/posts');
    if (response.ok) {
        console.log(response)
        dispatch(getAllPosts(response.data.posts));
        return response;
    }
};

export const createNewPost = payload => async dispatch => {
    const { title, content, body, makeId, modelId, userId } = payload;
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content, body, makeId, modelId, userId })
    });

    if (response.ok) {
        dispatch(getPosts());
        return response;
    }
};

const initialState = { posts: null };

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            const allPosts = {};
            action.payload.forEach(post => {
                allPosts[post.id] = post;
            });
            return allPosts;
        default:
            return state;
    };
};

export default postReducer;