import React from "react";
import {Redirect, Route} from "react-router";
import {connect} from "react-redux";

const PrivateRoute = (props) => {
    const {component: Component, ...rest} = props;

    return (
        <Route {...rest} render={props => (
            rest.signIn.token ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/signin',
                    state: {from: props.location}
                }}/>
            ))
        }/>
    )
};

const mapStateToProps = (state) => {
    return {
        signIn: state.signIn
    }
};

export default connect(mapStateToProps)(PrivateRoute);