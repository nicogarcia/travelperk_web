import React, {Component} from "react";
import TripItem from "./TripItem";
import {connect} from "react-redux";
import {createTrip, fetchTrips, removeTrip} from "./action/action.types";
import {Table} from "reactstrap";

class TripList extends Component {
    input;

    constructor(props) {
        super(props);

        this.state = {
            createModalOpened: false
        };

        this.createTrip = this.createTrip.bind(this);
        this.removeTrip = this.removeTrip.bind(this);
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

    render() {
        const {trips} = this.props;

        return (
            <div className="container-fluid">
                <h2>Trips</h2>

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