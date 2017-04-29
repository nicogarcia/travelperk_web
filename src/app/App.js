import React, {Component} from "react";
import {Redirect, Route, Switch, withRouter} from "react-router";

import Header from "../header/Header";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Trips from "../trip/TripList";

import "./App.css";
import PrivateRoute from "./router/PrivateRoute";
import {Button, Col, Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PlaceAutocomplete from "../places/PlaceAutocomplete";
import {closeCreateModalAction} from "../trip/create-modal/action/action.types";
import {connect} from "react-redux";

class App extends Component {
    closeCreateTripModal = () => {
        this.props.dispatch(closeCreateModalAction());
    };

    render() {
        return (
            <div className="App">
                <Header />

                <Switch>
                    <Redirect exact from="/" to="/trips"/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                    <PrivateRoute path="/trips" component={Trips}/>
                </Switch>

                <Modal isOpen={this.props.createTripModal.opened}>
                    <ModalHeader>Find your trip</ModalHeader>
                    <ModalBody>

                        <Form>

                            <FormGroup row>
                                <Label sm={2}>From</Label>
                                <Col sm={10}>
                                    <PlaceAutocomplete host="create.from"/>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2}>To</Label>
                                <Col sm={10}>
                                    <PlaceAutocomplete host="create.to"/>
                                </Col>
                            </FormGroup>

                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.closeCreateTripModal}>Cancel</Button>
                        <Button color="primary">Book Trip</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    createTripModal: state.createTripModal
});

export default withRouter(connect(mapStateToProps)(App));
