import {Api} from "../../app/api";
import {loginRequest} from "./auth.login.action";

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const signupRequest = (email, password) => (
    {
        type: SIGNUP_REQUEST,
        payload: {
            email,
            password
        }
    }
);

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const signupSuccess = (email, password) => (
    {
        type: SIGNUP_SUCCESS,
        payload: {
            email
        }
    }
);

export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const signupFailure = (email, password) => (
    {
        type: SIGNUP_FAILURE,
        payload: {
            email
        }
    }
);

export const requestSignup = (email, password) => {
    return dispatch => {
        dispatch(signupRequest(email, password));

        let fetchPromise = Api.post('/users', {email, password});

        fetchPromise
            .then(res => {
                signupSuccess(res.data.email);
                loginRequest(email, password);
            })
            .catch(error => signupFailure(error));

        return fetchPromise;
    }
};
