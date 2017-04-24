import {tripsReducer} from "../../trips/reducer/trips.reducer";
import {combineReducers} from "redux";

const appReducer = combineReducers({
    trips: tripsReducer,
    login: loginReducer
});

export default appReducer;
