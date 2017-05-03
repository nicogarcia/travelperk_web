import React, {Component} from "react";
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {closeCreateModalAction} from "./CreateTripModal.action";
import {createTrip} from "../Trips.action";
import {connect} from "react-redux";
import PlaceAutocomplete from "../../places/PlaceAutocomplete";

class CreateTripModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            toPlace: null,
            fromPlace: null
        };
    }

    closeCreateTripModal = () => {
        this.props.dispatch(closeCreateModalAction());
    };

    createTripHandler = (e) => {
        e.preventDefault();

        if (!this.state.value.trim()) {
            return
        }

        this.props.dispatch(createTrip(
            {
                name: this.state.value,
                from_place: this.state.fromPlace && this.state.fromPlace.PlaceId,
                to_place: this.state.toPlace && this.state.toPlace.PlaceId
            },
            () => this.props.dispatch(closeCreateModalAction())
        ));

        this.setState({value: '', toPlace: null, fromPlace: null});
    };

    render() {
        return (
            <Modal isOpen={this.props.createTripModal.opened}>
                <ModalHeader>Create a new trip</ModalHeader>

                <Form onSubmit={this.createTripHandler}>
                    <ModalBody>
                        <FormGroup row>
                            <Label sm={2}>Name</Label>
                            <Col sm={10}>
                                <Input value={this.state.value} onChange={e => this.setState({value: e.target.value})}/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label sm={2}>From</Label>
                            <Col sm={10}>
                                <PlaceAutocomplete host="create.from"
                                                   onSelected={place => this.setState({fromPlace: place})}/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label sm={2}>To</Label>
                            <Col sm={10}>
                                <PlaceAutocomplete host="create.to"
                                                   onSelected={place => this.setState({toPlace: place})}/>
                            </Col>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" onClick={this.closeCreateTripModal}>Cancel</Button>
                        <Button color="primary" type="submit">Create trip</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    createTripModal: state.createTripModal
});

export default connect(mapStateToProps)(CreateTripModal);