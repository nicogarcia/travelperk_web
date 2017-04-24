import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS} from "../action/action.types";

const initialState = {
    email: null,
    token: null,
    isPending: false,
    hasFailed: false
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, {email: action.payload.email, isPending: true, token: null});

        case LOGIN_SUCCESS:
            return Object.assign({}, state, {isPending: false, token: action.payload.token, hasFailed: false});

        case LOGIN_FAILURE:
            return Object.assign({}, state, {isPending: false, hasFailed: true});

        default:
            return state;
    }
};

export default loginReducer;