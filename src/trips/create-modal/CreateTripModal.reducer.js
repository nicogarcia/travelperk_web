import {CLOSE_CREATE_TRIP_MODAL, OPEN_CREATE_TRIP_MODAL} from "./CreateTripModal.action";

const initialState = {
    opened: false
};

export const createTripModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_CREATE_TRIP_MODAL:
            return Object.assign({}, state, {opened: true});

        case CLOSE_CREATE_TRIP_MODAL:
            return Object.assign({}, state, {opened: false});

        default:
            return state
    }
};
