import {FETCH_PLACE_REQUEST, FETCH_PLACES_SUCCESS, SELECT_PLACE} from "../action/place.action";
import {merge} from "lodash/object";

const initialState = {};

export const placeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLACE_REQUEST:
            let newStateReq = Object.assign({}, state);

            return merge(newStateReq, {[action.payload.host]: {isPending: true}});

        case FETCH_PLACES_SUCCESS:

            let newStateSuc = Object.assign({}, state);

            // Remove previous results to avoid merging
            newStateSuc[action.payload.host].items = [];

            return merge(newStateSuc, {
                [action.payload.host]: {
                    isPending: false,
                    items: action.payload.items
                }
            });

        case SELECT_PLACE:
            let newState = Object.assign({}, state);

            return merge(newState, {[action.payload.host]: {selected: action.payload.place}});

        default:
            return state;
    }
};
