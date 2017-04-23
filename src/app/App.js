import React, {Component} from "react";
import {Redirect, Route} from "react-router";
import PrivateRoute from "./router/PrivateRoute";

import Header from "../header/Header";
import Login from "../login/Login";
import Trips from "../trips/TripList";

import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />

                <Redirect to="/trips"/>

                <Route path="/login" component={Login}/>
                <PrivateRoute path="/trips" component={Trips}/>
            </div>
        );
    }
}

export default App;
