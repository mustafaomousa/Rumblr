import { fetch } from './csrf';

const initialState = { user: null };

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

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
        default:
            return state;
    };
};

export default sessionReducer;