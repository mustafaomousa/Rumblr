import { fetch } from './csrf';

const LOAD = 'vehicles/getVehicles';


const getVehicles = ({ makes, models }) => {
    return {
        type: LOAD,
        payload: { makes, models },
    };
};

export const getAllVehicles = () => async dispatch => {
    const response = await fetch('/api/vehicles');

    if (response.ok) {
        console.log(response.data)
        dispatch(getVehicles(response.data));
        return response;
    }
};


const initialState = { makes: null, models: null };

const vehicleReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = { makes: action.payload.makes, models: action.payload.models };
            return newState;
        default:
            return state;
    };
};

export default vehicleReducer;