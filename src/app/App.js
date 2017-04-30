import React from "react";
import {Redirect, Route, Switch} from "react-router";

import Header from "../header/Header";
import SignIn from "../signin/SignIn";
import Signup from "../signup/SignUp";
import Trips from "../trips/Trips";

import "./App.css";
import PrivateRoute from "./router/PrivateRoute";
import CreateTripModal from "../trips/create-modal/CreateTripModal";

const App = () => (
    <div className="App">
        <Header />

        <Switch>
            <Redirect exact from="/" to="/trips"/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={Signup}/>
            <PrivateRoute path="/trips" component={Trips}/>
        </Switch>

        <CreateTripModal />
    </div>
);

export default App;
