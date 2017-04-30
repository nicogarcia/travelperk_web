import {Api} from "../app/api";

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const signInRequest = (email, password) => (
    {
        type: SIGNIN_REQUEST,
        payload: {
            email,
            password
        }
    }
);

export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const signInSuccess = (token) => (
    {
        type: SIGNIN_SUCCESS,
        payload: {
            token
        }
    }
);

export const SIGNIN_FAILURE = 'SIGNIN_FAILED';
export const signInFailure = (error) => (
    {
        type: SIGNIN_FAILURE,
        payload: {
            error
        }
    }
);

export const SIGNOUT_REQUEST = 'SIGNOUT_REQUEST';
export const signOutRequest = () => (
    {
        type: SIGNOUT_REQUEST
    }
);

export const requestSignIn = (email, password) => {
    return dispatch => {
        dispatch(signInRequest(email, password));

        let fetchPromise = Api.post('/token', {email, password});

        fetchPromise
            .then(res => dispatch(signInSuccess(res.data.token)))
            .catch(res => dispatch(signInFailure(res.data)));

        return fetchPromise;
    }
};
