import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/v1',
    timeout: 2000
});

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

        let fetchPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                    if (email === 'travelperk') {
                        resolve({
                            token: 'asdfasdfasdfasdfasdf'
                        })
                    } else {
                        reject({})
                    }
                },
                1000
            );
        });

        fetchPromise
            .then(res => dispatch(loginSuccess(res)))
            .catch(res => dispatch(loginFailure(res)));

        return fetchPromise;
    }
};

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

        let fetchPromise = axiosInstance.post('/users', {email, password});

        fetchPromise
            .then(res => {
                signupSuccess(res.data.email);
                loginRequest(email, password);
            })
            .catch(error => signupFailure(error));

        return fetchPromise;
    }
};