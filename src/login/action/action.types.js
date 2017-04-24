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