import {SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS} from "./SignUp.action";

const signupInitialState = {
    email: null,
    isPending: false,
    hasFailed: false
};

export const signupReducer = (state = signupInitialState, action) => {
    switch (action.type) {

        case SIGNUP_REQUEST:
            return Object.assign({}, signupInitialState, {email: action.payload.email, isPending: true});

        case SIGNUP_SUCCESS:
            return Object.assign({}, state, {isPending: false, hasFailed: false});

        case SIGNUP_FAILURE:
            return Object.assign({}, state, {isPending: false, hasFailed: true, errors: action.payload.error});

        default:
            return state;
    }
};