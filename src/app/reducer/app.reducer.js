import {tripsReducer} from "../../trip/reducer/trips.reducer";
import {loginReducer, signupReducer} from "../../auth/reducer/auth.reducer";
import {placeReducer} from "../../places/reducer/place.reducer";
import {combineReducers} from "redux";
import {createTripModalReducer} from "../../trip/create-modal/reducer/create-modal.reducer";

const appReducer = combineReducers({
    trips: tripsReducer,
    login: loginReducer,
    signup: signupReducer,
    places: placeReducer,
    createTripModal: createTripModalReducer
});

export default appReducer;
