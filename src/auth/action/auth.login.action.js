import {Api} from "../../app/api";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = (email, password) => (
    {
        type: LOGIN_REQUEST,
        payload: {
            email,
            password
        }
    }
);

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = (token) => (
    {
        type: LOGIN_SUCCESS,
        payload: {
            token
        }
    }
);

export const LOGIN_FAILURE = 'LOGIN_FAILED';
export const loginFailure = (error) => (
    {
        type: LOGIN_FAILURE,
        payload: {
            error
        }
    }
);

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const logoutRequest = () => (
    {
        type: LOGOUT_REQUEST
    }
);

export const requestLogin = (email, password) => {
    return dispatch => {
        dispatch(loginRequest(email, password));

        let fetchPromise = Api.post('/token', {email, password});

        fetchPromise
            .then(res => dispatch(loginSuccess(res)))
            .catch(res => dispatch(loginFailure(res)));

        return fetchPromise;
    }
};
