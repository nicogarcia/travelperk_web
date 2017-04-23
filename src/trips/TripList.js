import React, {Component} from "react";
import TripItem from "./TripItem";
import {connect} from "react-redux";
import {createTrip, fetchTrips, removeTrip} from "./action/action.types";
import {Button, Input} from "reactstrap";

class TripList extends Component {
    input;

    constructor(props) {
        super(props);

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
    }

    removeTrip(id) {
        this.props.dispatch(removeTrip(id))
    }

    render() {
        const {trips} = this.props;

        return (
            <div>
                <Input type="text" getRef={node => {
                    this.input = node
                }}/>

                <Button onClick={this.createTrip}>
                    Create Trip
                </Button>

                {trips.isFetching ? 'Cargando..' : ''}

                <ul>
                    {
                        Object.keys(trips.items).map(id => (
                            <TripItem key={id} trip={trips.items[id]} onRemoveTrip={this.removeTrip}/>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        trips: state.tripsReducer
    };
};

export default connect(mapStateToProps)(TripList);