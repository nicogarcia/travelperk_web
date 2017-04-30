import {tripsReducer} from "../trips/Trip.reducer";
import {placeReducer} from "../places/PlaceAutocomplete.reducer";
import {combineReducers} from "redux";
import {createTripModalReducer} from "../trips/create-modal/CreateTripModal.reducer";
import {signInReducer} from "../signin/SignIn.reducer";
import {signupReducer} from "../signup/SignUp.reducer";

const appReducer = combineReducers({
    trips: tripsReducer,
    signIn: signInReducer,
    signUp: signupReducer,
    places: placeReducer,
    createTripModal: createTripModalReducer
});

export default appReducer;
