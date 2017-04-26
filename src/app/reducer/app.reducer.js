import {tripsReducer} from "../../trip/reducer/trips.reducer";
import {loginReducer} from "../../auth/reducer/auth.reducer";
import {placeReducer} from "../../trip/creation/reducer/place.reducer";
import {combineReducers} from "redux";

const appReducer = combineReducers({
    trips: tripsReducer,
    login: loginReducer,
    places: placeReducer
});

export default appReducer;
