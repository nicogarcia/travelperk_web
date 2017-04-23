import React, {Component} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import Auth from "../auth/Auth";
import {Redirect} from "react-router";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            isLoading: false
        };

        this.login = this.login.bind(this);
    }

    login() {
        this.setState({isLoading: true});

        return Auth.authenticate().then(() => {
            this.setState({redirect: true, isLoading: false})
        });
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        const {redirect} = this.state;

        if (redirect) {
            return (
                <Redirect to={from}/>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6 offset-md-3">
                        <h1>Login</h1>

                        <Form>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input id="email" type="text" name="email" placeholder="Enter your email"/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input id="password" type="password" name="password" placeholder="Type your password"/>
                            </FormGroup>

                            <Button
                                color="primary"
                                disabled={this.state.isLoading}
                                onClick={!this.state.isLoading ? this.login : null}>
                                {
                                    this.state.isLoading ?
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

export default Login;
