import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./app/router/Router";
import "jquery";
/* CSS */
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

ReactDOM.render(
    <AppRouter />,
    document.getElementById('root')
);
