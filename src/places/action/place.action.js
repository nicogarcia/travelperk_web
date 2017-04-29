import $ from "jquery";
import {filter, flatMap, groupBy, map} from "lodash/collection";
import {findIndex} from "lodash/array";
import {mapValues} from "lodash/object";

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

export const SELECT_PLACE = 'SELECT_PLACE';
export const selectPlaceAction = (place, host) => (
    {
        type: SELECT_PLACE,
        payload: {
            place,
            host
        }
    }
);

const parsePlaces = (places) => {
    // All airports have city, if it has no city, then is not airport; no city, then is country
    let airportsAndCities = filter(places, e => e.CityId !== '-sky');

    // Flag cities
    let airportsAndflaggedCities = map(
        airportsAndCities,
        e => (e.CityId === e.PlaceId) ? Object.assign({}, e, {IsCity: true}) : e
    );

    // Group places by city
    let groupedAirportsAndCities = groupBy(airportsAndflaggedCities, 'CityId')

    // Add has city flag to places
    let flaggedPlaces = mapValues(groupedAirportsAndCities, cityPlaces => {
        // Any of the city places is actually a city
        let hasCity = findIndex(cityPlaces, el => el.IsCity) >= 0;

        // Flag according to previous result
        return map(cityPlaces, v => v.IsCity ? v : Object.assign({}, v, {HasCity: hasCity}))
    });

    // Flat all places
    return flatMap(flaggedPlaces);
};

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
            dispatch(fetchAirportsSuccessAction(parsePlaces(data.Places), host));
        });

        return fetchPromise;
    };
};
