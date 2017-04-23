export const CREATE_TRIP = 'CREATE_TRIP';
export const createTrip = (trip) => {
    return {
        type: CREATE_TRIP,
        payload: trip
    };
};

export const REMOVE_TRIP = 'REMOVE_TRIP';
export const removeTrip = (id) => {
    return {
        type: REMOVE_TRIP,
        payload: id
    };
};

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

        let fetchPromise = new Promise((resolve) => {
            setTimeout(() => resolve({
                    1: {id: 1, text: 'Uno'}, 2: {id: 2, text: 'Dos'}, 3: {id: 3, text: 'Tres'}
                }),
                1000
            );
        });

        fetchPromise.then(res => dispatch(receivedTrips(res)));

        return fetchPromise;
    }
};
