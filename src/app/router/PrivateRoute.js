import React from "react";
import {Redirect, Route} from "react-router";
import {connect} from "react-redux";

const PrivateRoute = (props) => {
    const {component: Component, ...rest} = props;

    return (
        <Route {...rest} render={props => (
            rest.login.token ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
            ))
        }/>
    )
};

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
};

export default connect(mapStateToProps)(PrivateRoute);