import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "../reducer/app.reducer";
import {autoRehydrate, persistStore} from "redux-persist";

let store = createStore(
    appReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(
        applyMiddleware(
            thunkMiddleware
        ),
        autoRehydrate()
    )
);

persistStore(store);

export default store;