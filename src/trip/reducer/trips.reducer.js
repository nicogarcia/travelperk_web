import {
    CREATE_TRIP,
    FETCH_TRIPS_FAILED,
    FETCH_TRIPS_REQUEST,
    FETCH_TRIPS_SUCCESS,
    REMOVE_TRIP
} from "../action/action.types";

const initialState = {
    isFetching: false,
    didInvalidate: false,
    items: {}
};

export function tripsReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_TRIP:
            let id = action.payload.id;

            if (state.items[id]) {
                return state;
            }

            let items = state.items;
            items[id] = action.payload;

            return Object.assign({}, state, {items: items});

        case REMOVE_TRIP:
            let stateCopy = Object.assign({}, state);
            delete stateCopy.items[action.payload];
            return stateCopy;

        case FETCH_TRIPS_REQUEST:
            return Object.assign({}, state, {isFetching: true, didInvalidate: false});

        case FETCH_TRIPS_SUCCESS:
            return Object.assign({}, state, {isFetching: false, didInvalidate: false, items: action.payload});

        case FETCH_TRIPS_FAILED:
            return Object.assign({}, state, {isFetching: false});

        default:
            return state;
    }
}