import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router";

import Header from "../header/Header";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Trips from "../trip/TripList";

import "./App.css";
import PrivateRoute from "./router/PrivateRoute";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />

                <Redirect to="/trips"/>

                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                    <PrivateRoute path="/trips" component={Trips}/>
                </Switch>
            </div>
        );
    }
}

export default App;
