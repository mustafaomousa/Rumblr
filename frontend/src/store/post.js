import { fetch } from './csrf';


const LOAD = 'post/getAllPosts';
const LOAD_TAGS = 'post/getAllTags';
const LOAD_TAG_POSTS = 'post/LOAD_TAG_POSTS';

const getAllTags = tags => {
    return {
        type: LOAD_TAGS,
        payload: tags
    };
};

const getAllPosts = posts => {
    return {
        type: LOAD,
        payload: posts,
    };
};

const getTagPosts = tagPosts => {
    return {
        type: LOAD_TAG_POSTS,
        payload: tagPosts
    }
}

export const getTags = () => async dispatch => {
    const response = await fetch(`/api/posts/tags`);

    if (response.ok) {
        dispatch(getAllTags(response.data.tags))
    }
};

export const getRecentTagPosts = (tagName) => async dispatch => {
    const response = await fetch(`/api/posts/${tagName}`);
    if (response.ok) {
        dispatch(getTagPosts(response.data.tagPosts))
    }
};

export const getPosts = () => async dispatch => {
    const response = await fetch('/api/posts');
    if (response.ok) {
        dispatch(getAllPosts(response.data.posts));
        return response;
    }
};

export const createNewPost = payload => async dispatch => {
    const { title, content, body, tags, makeId, modelId, userId } = payload;
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content, body, tags, makeId, modelId, userId })
    });

    if (response.ok) {
        dispatch(getPosts());
        return response;
    }
};

const initialState = { allPosts: null, tagPosts: null };

const postReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD:
            newState = Object.assign({}, state, { allPosts: action.payload })
            return newState;
        case LOAD_TAG_POSTS:
            newState = Object.assign({}, state, { tagPosts: action.payload });
            return newState;
        case LOAD_TAGS:
            newState = Object.assign({}, state, { tags: action.payload });
            return newState;
        default:
            return state;
    };
};

export default postReducer;