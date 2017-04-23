import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "../reducer/app.reducer";

let store = createStore(
    appReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunkMiddleware
    )
);

export default store;