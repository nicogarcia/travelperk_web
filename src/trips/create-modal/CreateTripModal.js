import React, {Component} from "react";
import {
    Alert,
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
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
        const trips = this.props.trips;

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

                        {
                            trips.hasFailed && trips.errors.status_code !== 500 &&
                            (<div>
                                {
                                    Object.keys(trips.errors).map((key, value) => (
                                        <Alert key={key} color="danger">{key} is invalid</Alert>
                                    ))
                                }
                            </div>)
                        }

                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" onClick={this.closeCreateTripModal}>Cancel</Button>
                        <Button
                            color="primary"
                            type="submit"
                            disabled={trips.isCreating}>
                            {
                                trips.isCreating ?
                                    (<span><i className='fa fa-circle-o-notch fa-spin'/> Create trip</span>) :
                                    'Create trip'
                            }
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    createTripModal: state.createTripModal,
    trips: state.trips
});

export default connect(mapStateToProps)(CreateTripModal);