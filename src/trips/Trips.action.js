import {Api} from "../app/api/index";

export const CREATE_TRIP_REQUEST = 'CREATE_TRIP_REQUEST';
export const createTripRequestAction = (trip) => ({
    type: CREATE_TRIP_REQUEST,
    payload: trip
});

export const CREATE_TRIP_SUCCESS = 'CREATE_TRIP_SUCCESS';
export const createTripSuccessAction = (trip) => ({
    type: CREATE_TRIP_SUCCESS,
    payload: trip
});

export const CREATE_TRIP_FAILURE = 'CREATE_TRIP_FAILURE';
export const createTripFailureAction = (error) => ({
    type: CREATE_TRIP_FAILURE,
    payload: error
});

export const REMOVE_TRIP_REQUEST = 'REMOVE_TRIP_REQUEST';
export const removeTripRequestAction = (id) => ({
    type: REMOVE_TRIP_REQUEST,
    payload: id
});

export const REMOVE_TRIP_SUCCESS = 'REMOVE_TRIP_SUCCESS';
export const removeTripSuccessAction = (id) => ({
    type: REMOVE_TRIP_SUCCESS,
    payload: id
});

export const REMOVE_TRIP_FAILURE = 'REMOVE_TRIP_FAILURE';
export const removeTripFailureAction = (error) => ({
    type: REMOVE_TRIP_FAILURE,
    payload: error
});

export const FETCH_TRIPS_REQUEST = 'FETCH_TRIPS_REQUEST';
export const requestTrips = () => {
    return {
        type: FETCH_TRIPS_REQUEST
    }
};

export const FETCH_TRIPS_SUCCESS = 'FETCH_TRIPS_SUCCESS';
export const receivedTrips = (trips) => {
    return {
        type: FETCH_TRIPS_SUCCESS,
        payload: trips
    }
};

export const FETCH_TRIPS_FAILED = 'FETCH_TRIPS_FAILED';
export const failedTrips = (error) => {
    return {
        type: FETCH_TRIPS_FAILED,
        payload: error
    }
};

export const fetchTrips = () => {
    return dispatch => {
        dispatch(requestTrips());

        let fetchPromise = Api.get('/trips');

        fetchPromise
            .then(res => dispatch(receivedTrips(res.data)));

        // TODO: Add catch and refactor actions

        return fetchPromise;
    }
};

export const createTrip = (trip, successCb) => {
    return dispatch => {
        dispatch(createTripRequestAction(trip));

        let createPromise = Api.post('/trips', trip);

        createPromise
            .then(res => {
                dispatch(createTripSuccessAction(res.data));
                dispatch(fetchTrips());

                successCb && successCb();
            })
            .catch(res => dispatch(createTripFailureAction(res.response.data)));

        return createPromise;
    }
};

export const removeTrip = id => {
    return dispatch => {
        dispatch(removeTripRequestAction(id));

        let deletePromise = Api.delete('/trips/' + id);

        deletePromise
            .then(() => {
                dispatch(removeTripSuccessAction(id));
                dispatch(fetchTrips());
            })
            .catch(res => dispatch(removeTripFailureAction(res.response.data)));

        return deletePromise;
    }
};