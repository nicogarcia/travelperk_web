import {Api} from "../app/api";
import {requestSignIn} from "../signin/SignIn.action";

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
export const signupFailure = (error) => (
    {
        type: SIGNUP_FAILURE,
        payload: {
            error
        }
    }
);

export const requestSignup = (email, password) => {
    return dispatch => {
        dispatch(signupRequest(email, password));

        let fetchPromise = Api.post('/users', {email, password});

        fetchPromise
            .then(res => {
                dispatch(signupSuccess(res.data.email));
                dispatch(requestSignIn(email, password));
            })
            .catch(res => {
                dispatch(signupFailure(res.response));
            });

        return fetchPromise;
    }
};
