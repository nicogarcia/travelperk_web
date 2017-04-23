import {tripsReducer} from "../../trips/reducer/trips.reducer";
import {combineReducers} from "redux";

const appReducer = combineReducers({
    tripsReducer
});

export default appReducer;
