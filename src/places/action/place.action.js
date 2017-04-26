import $ from "jquery";

export const FETCH_PLACE_REQUEST = 'FETCH_PLACE_REQUEST';
export const fetchPlacesRequestAction = (text, host) => (
    {
        type: FETCH_PLACE_REQUEST,
        payload: {
            text,
            host
        }
    }
);

export const FETCH_PLACES_SUCCESS = 'FETCH_PLACES_SUCCESS';
export const fetchAirportsSuccessAction = (items, host) => (
    {
        type: FETCH_PLACES_SUCCESS,
        payload: {
            host,
            items
        }
    }
);

const url = `https://api.skyscanner.net/apiservices/xd/autosuggest/v1.0/ES/EUR/en-US`;

export const fetchPlaces = (text, host) => {
    return (dispatch) => {
        dispatch(fetchPlacesRequestAction(text, host));

        let fetchPromise = new Promise((resolve) => {
            $.ajax({
                url: url,
                dataType: 'jsonp',
                data: {
                    apiKey: 'li834490715021823391542979638497',
                    query: text
                }
            }).done(function (data) {
                resolve(data);
            });
        });

        fetchPromise.then(data => {
            dispatch(fetchAirportsSuccessAction(data.Places, host));
        });

        return fetchPromise;
    };
};