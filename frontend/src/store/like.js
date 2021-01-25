import { fetch } from './csrf';


const LOAD = 'likes/getAllLikes';
const CREATE = 'likes/addLike';

const getAllLikes = likes => {
    return {
        type: LOAD,
        payload: likes,
    };
};

const addLike = like => {
    return {
        type: CREATE,
        payload: like
    };
}

export const getLikes = () => async dispatch => {
    const response = await fetch('/api/likes');
    if (response.ok) {
        dispatch(getAllLikes(response.data.likes));
        return response;
    }
};

export const createNewLike = payload => async dispatch => {
    const { userId, postId } = payload;
    const response = await fetch('/api/likes', {
        method: 'POST',
        body: JSON.stringify({ userId, postId })
    });

    if (response.ok) {
        dispatch(getLikes());
        return response;
    }
};

export const deleteLike = payload => async dispatch => {
    const { userId, postId } = payload;
    const response = await fetch('/api/likes', {
        method: 'DELETE',
        body: JSON.stringify({ userId, postId })
    });

    if (response.ok) {
        dispatch(getLikes());
        return response;
    }
}

const initialState = { posts: null };

const likeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = { likes: action.payload };
            return newState;
        default:
            return state;
    };
};

export default likeReducer;