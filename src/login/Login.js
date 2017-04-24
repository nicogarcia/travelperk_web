import React, {Component} from "react";
import {Alert, Button, Form, FormGroup, Input, Label} from "reactstrap";
import {Redirect} from "react-router";
import {connect} from "react-redux";
import {requestLogin} from "./action/action.types";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.login = this.login.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    login(event) {
        event.preventDefault();

        this.props.dispatch(requestLogin(this.state.email, this.state.password));
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        const {login} = this.props;

        if (login.token) {
            return (
                <Redirect to={from}/>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6 offset-md-3">
                        <h1>Login</h1>

                        <Form onSubmit={this.login}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input id="email" type="text" name="email" placeholder="Enter your email"
                                       value={this.state.email} onChange={this.handleEmailChange}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input id="password" type="password" name="password" placeholder="Type your password"
                                       value={this.state.password} onChange={this.handlePasswordChange}/>
                            </FormGroup>

                            {
                                login.hasFailed ? (
                                    <Alert color="danger">Email or password incorrect</Alert>
                                ) : ''
                            }

                            <Button
                                color="primary"
                                type="submit"
                                disabled={login.isPending}>
                                {
                                    login.isPending ?
                                        (<span><i className='fa fa-circle-o-notch fa-spin'/> Login</span>) :
                                        'Login'
                                }
                            </Button>
                        </Form>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    };
};

export default connect(mapStateToProps)(Login);
