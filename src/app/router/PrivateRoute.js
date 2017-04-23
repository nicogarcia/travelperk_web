import React, {Component} from "react";
import Auth from "../../auth/Auth";
import {Redirect, Route} from "react-router";

class PrivateRoute extends Component {

    render() {
        const {component: Component, ...rest} = this.props;

        return (
            <Route {...rest} render={props => (
                Auth.isAuthenticated() ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}/>
                )
            )}/>
        )
    }
}

export default PrivateRoute;