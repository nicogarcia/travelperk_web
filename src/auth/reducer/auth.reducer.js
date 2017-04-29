import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST} from "../action/auth.login.action";

import {SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS} from "../action/auth.signup.action";

const initialState = {
    email: null,
    token: null,
    isPending: false,
    hasFailed: false
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, {email: action.payload.email, isPending: true, token: null, hasFailed: false});

        case LOGIN_SUCCESS:
            return Object.assign({}, state, {isPending: false, token: action.payload.token, hasFailed: false});

        case LOGIN_FAILURE:
            return Object.assign({}, state, {email: null, token: null, isPending: false, hasFailed: true});

        case LOGOUT_REQUEST:
            return Object.assign({}, initialState);

        default:
            return state;
    }
};

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