import React, {Component} from "react";
import {Alert, Button, Form, FormGroup, Input, Label} from "reactstrap";
import {Redirect} from "react-router";
import {connect} from "react-redux";
import {requestSignIn} from "./SignIn.action";
import {Link} from "react-router-dom";

class SignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    componentWillMount() {
        this.props.dispatch(requestSignIn('a@a.com', 'asdfasdf'));
    }

    signIn = (event) => {
        event.preventDefault();

        this.props.dispatch(requestSignIn(this.state.email, this.state.password));
    };

    handleEmailChange = (event) => {
        this.setState({email: event.target.value})
    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value})
    };

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        const {signIn} = this.props;

        if (signIn.token) {
            return (
                <Redirect to={from}/>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6 offset-md-3">
                        <h1>Sign In</h1>

                        <Form onSubmit={this.signIn}>
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
                                signIn.hasFailed &&

                                <Alert color="danger">Email or password incorrect</Alert>
                            }

                            <Button
                                color="primary"
                                type="submit"
                                disabled={signIn.isPending}>
                                {
                                    signIn.isPending ?
                                        (<span><i className='fa fa-circle-o-notch fa-spin'/> Sign In</span>) :
                                        'Sign In'
                                }
                            </Button>
                        </Form>

                        <Link to='/signup'>Not signed up yet?</Link>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signIn: state.signIn
    };
};

export default connect(mapStateToProps)(SignIn);
