import React from "react";
import {BrowserRouter} from "react-router-dom";
import App from "../App";
import {Provider} from "react-redux";
import store from "../App.store";

const AppRouter = () => (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

export default AppRouter;