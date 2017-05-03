import {
    CREATE_TRIP_FAILURE,
    CREATE_TRIP_REQUEST,
    CREATE_TRIP_SUCCESS,
    FETCH_TRIPS_FAILED,
    FETCH_TRIPS_REQUEST,
    FETCH_TRIPS_SUCCESS,
    REMOVE_TRIP_FAILURE,
    REMOVE_TRIP_REQUEST,
    REMOVE_TRIP_SUCCESS
} from "./Trips.action";

const initialState = {
    isFetching: false,
    hasFailed: false,
    items: [],
    errors: []
};

export function tripsReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_TRIP_REQUEST:
            return Object.assign({}, state, {isCreating: true, hasFailed: false, errors: []});

        case CREATE_TRIP_SUCCESS:
            return Object.assign({}, state, {isCreating: false});

        case CREATE_TRIP_FAILURE:
            return Object.assign({}, state, {isCreating: false, hasFailed: true, errors: action.payload});

        case REMOVE_TRIP_REQUEST:
            return Object.assign({}, state, {isDeleting: false, hasFailed: false, errors: action.payload});

        case REMOVE_TRIP_SUCCESS:
            return Object.assign({}, state, {isDeleting: false});

        case REMOVE_TRIP_FAILURE:
            return Object.assign({}, state, {isDeleting: false, hasFailed: true, errors: action.payload});

        case FETCH_TRIPS_REQUEST:
            return Object.assign({}, state, {isFetching: true});

        case FETCH_TRIPS_SUCCESS:
            return Object.assign({}, state, {isFetching: false, items: action.payload});

        case FETCH_TRIPS_FAILED:
            return Object.assign({}, state, {isFetching: false});

        default:
            return state;
    }
}