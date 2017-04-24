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