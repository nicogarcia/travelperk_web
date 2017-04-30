import React, {Component} from "react";
import {requestSignup} from "./SignUp.action";
import {Alert, Button, Form, FormGroup, Input, Label} from "reactstrap";
import {connect} from "react-redux";

class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.props.dispatch(requestSignup(this.state.email, this.state.password));
    };

    render() {
        const {signUp} = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6 offset-md-3">
                        <h2>Sign Up</h2>

                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input id="email" type="text" name="email" placeholder="Enter your email"
                                       value={this.state.email}
                                       onChange={e => this.setState({email: e.target.value})}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input id="password" type="password" name="password"
                                       placeholder="Type your password"
                                       value={this.state.password}
                                       onChange={e => this.setState({password: e.target.value})}/>
                            </FormGroup>

                            {
                                signUp.hasFailed &&
                                (<div>
                                    {
                                        Object.keys(signUp.errors).map((key, value) => (
                                            <Alert key={key} color="danger">{key} is invalid</Alert>
                                        ))
                                    }
                                </div>)
                            }

                            <Button
                                color="primary"
                                type="submit"
                                disabled={signUp.isPending}>
                                {
                                    signUp.isPending ?
                                        (<span><i className='fa fa-circle-o-notch fa-spin'/> Sign Up</span>) :
                                        'Sign Up'
                                }
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        signUp: state.signUp
    }
);

export default connect(mapStateToProps)(Signup);