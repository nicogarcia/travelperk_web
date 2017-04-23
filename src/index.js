import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import AppRouter from "./app/router/Router";
import store from "./app/store/app.store";
import "jquery";
/* CSS */
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('root')
);
