import {SIGNIN_FAILURE, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNOUT_REQUEST} from "./SignIn.action";

const initialState = {
    email: null,
    token: null,
    isPending: false,
    hasFailed: false
};

export const signInReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_REQUEST:
            return Object.assign({}, {email: action.payload.email, isPending: true, token: null, hasFailed: false});

        case SIGNIN_SUCCESS:
            return Object.assign({}, state, {isPending: false, token: action.payload.token, hasFailed: false});

        case SIGNIN_FAILURE:
            return Object.assign({}, state, {email: null, token: null, isPending: false, hasFailed: true});

        case SIGNOUT_REQUEST:
            return Object.assign({}, initialState);

        default:
            return state;
    }
};