import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./App.reducer";

let store = createStore(
    appReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(
        applyMiddleware(
            thunkMiddleware
        ),
        //autoRehydrate()
    )
);

//persistStore(store);

export default store;