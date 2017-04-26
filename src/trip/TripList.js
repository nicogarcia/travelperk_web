import React, {Component} from "react";
import TripItem from "./TripItem";
import {connect} from "react-redux";
import {createTrip, fetchTrips, removeTrip} from "./action/action.types";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";

class TripList extends Component {
    input;

    constructor(props) {
        super(props);

        this.state = {
            createModalOpened: false
        };

        this.createTrip = this.createTrip.bind(this);
        this.removeTrip = this.removeTrip.bind(this);
        this.openCreateTripDialog = this.openCreateTripDialog.bind(this);
        this.closeCreateTripDialog = this.closeCreateTripDialog.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchTrips());
    }

    createTrip() {
        if (!this.input.value.trim()) {
            return
        }

        this.props.dispatch(createTrip({
            id: Number.parseInt(this.input.value, 10),
            text: `trip ${this.input.value} redux`
        }));

        this.input.value = '';
        this.closeCreateTripDialog();
    }

    removeTrip(id) {
        this.props.dispatch(removeTrip(id))
    }

    openCreateTripDialog() {
        this.setState({createModalOpened: true});
    }

    closeCreateTripDialog() {
        this.setState({createModalOpened: false});
    }

    render() {
        const {trips} = this.props;
        const {createModalOpened} = this.state;

        return (
            <div>
                <h2>Trips</h2>

                <Button onClick={this.openCreateTripDialog}>
                    New Trip
                </Button>

                <hr />

                <Table>
                    <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        trips.isFetching && <tr>
                            <td>Cargando...</td>
                        </tr>
                    }
                    {
                        Object.keys(trips.items).map(id => (
                            <TripItem key={id} trip={trips.items[id]} onRemoveTrip={this.removeTrip}/>
                        ))
                    }
                    </tbody>
                </Table>

                <Modal isOpen={createModalOpened} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Find your trip</ModalHeader>
                    <ModalBody>

                        <Input type="text" getRef={node => {
                            this.input = node
                        }}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.closeCreateTripDialog}>Cancel</Button>
                        <Button color="primary" onClick={this.createTrip}>Book Trip</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        trips: state.trips
    };
};

export default connect(mapStateToProps)(TripList);