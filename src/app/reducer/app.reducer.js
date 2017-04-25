import {tripsReducer} from "../../trip/reducer/trips.reducer";
import {loginReducer} from "../../auth/reducer/auth.reducer";
import {combineReducers} from "redux";

const appReducer = combineReducers({
    trips: tripsReducer,
    login: loginReducer
});

export default appReducer;
