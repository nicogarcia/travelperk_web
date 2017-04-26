import {FETCH_PLACE_REQUEST, FETCH_PLACES_SUCCESS} from "../action/place.action";

const initialState = {};

export const placeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLACE_REQUEST:
            return Object.assign({}, state, {[action.payload.host]: {isPending: true, items: []}});

        case FETCH_PLACES_SUCCESS:
            return Object.assign({}, state, {
                [action.payload.host]: {
                    isPending: false,
                    items: action.payload.items
                }
            });

        default:
            return state;
    }
};
