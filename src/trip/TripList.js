import React, {Component} from "react";
import TripItem from "./TripItem";
import {connect} from "react-redux";
import {fetchTrips, removeTrip} from "./action/action.types";
import {Button, Table} from "reactstrap";
import {openCreateModalAction} from "./create-modal/action/action.types";
import {isEmpty} from "lodash/lang";


class TripList extends Component {

    componentDidMount() {
        this.props.dispatch(fetchTrips());
    }

    removeTripHandler = (id) => {
        this.props.dispatch(removeTrip(id));
    };

    openCreateTripModal = () => {
        this.props.dispatch(openCreateModalAction());
    };

    render() {
        const {trips} = this.props;

        return (
            <div className="container-fluid">
                <h2>Trips</h2>

                <hr />

                <Table>
                    <thead>
                    <tr>
                        <th>Trip N°</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        trips.isFetching &&
                        <tr>
                            <td>Cargando...</td>
                        </tr>
                    }
                    {
                        (!trips.isFetching && isEmpty(trips.items)) &&
                        <tr>
                            <td>You have no trips yet,
                                <Button color="link" onClick={this.openCreateTripModal}>create your first one</Button>
                            </td>
                        </tr>
                    }
                    {
                        Object.keys(trips.items).map(id => (
                            <TripItem key={id} trip={trips.items[id]} onRemoveTrip={this.removeTripHandler}/>
                        ))
                    }
                    </tbody>
                </Table>
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