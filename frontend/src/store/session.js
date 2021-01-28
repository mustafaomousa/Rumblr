import { fetch } from './csrf';

const initialState = { user: null, allUsers: null };

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const ALL_USER = 'session/getAllUsers';
const NEWEST_USER = 'session/getNewestUsers';

const getNewestUsers = newestUsers => {
    return {
        type: NEWEST_USER,
        payload: newestUsers
    }
};

const getUsers = users => {
    return {
        type: ALL_USER,
        payload: users
    }
};

const setUser = user => {
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

export const signup = user => async dispatch => {
    const { username, email, header, bio, profilePicture, password } = user;
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, header, bio, profilePicture, password })
    });

    if (response.ok) {
        dispatch(setUser(response.data.user));
        return response;
    }
};

export const getAllUsers = () => async dispatch => {
    const response = await fetch('/api/users');

    if (response.ok) {
        dispatch(getUsers(response.data.users))
    }
};

export const getAllNewestUsers = () => async dispatch => {
    const response = await fetch('/api/users/newest');

    if (response.ok) {
        dispatch(getNewestUsers(response.data.newestUsers))
    }
};

export const login = user => async dispatch => {
    const { credential, password } = user;
    const response = await fetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ credential, password })
    });

    if (response.ok) {
        dispatch(setUser(response.data.user));
        return response;
    }
};

export const logout = () => async dispatch => {
    const response = await fetch('/api/session', {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(removeUser());
        return response;
    };
};

export const restoreUser = () => async dispatch => {
    const res = await fetch('/api/session');
    dispatch(setUser(res.data.user));
    return res;
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
        case ALL_USER:
            newState = Object.assign({}, state);
            newState.allUsers = action.payload;
            return newState;
        case NEWEST_USER:
            newState = Object.assign({}, state, { newestBlogs: action.payload });
            return newState;
        default:
            return state;
    };
};

export default sessionReducer;