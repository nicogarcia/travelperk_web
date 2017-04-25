import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router";
import PrivateRoute from "./router/PrivateRoute";

import Header from "../header/Header";
import Login from "../login/Login";
import Trips from "../trip/TripList";

import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />

                <Redirect to="/trips"/>

                <Switch>
                    <Route path="/login" component={Login}/>
                    <PrivateRoute path="/trips" component={Trips}/>
                </Switch>
            </div>
        );
    }
}

export default App;
