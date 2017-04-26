import React from "react";
import {Button} from "reactstrap";

const TripItem = ({trip, onRemoveTrip}) => (
    <tr>
        <td>{trip.id}</td>
        <td>{trip.text}</td>
        <td>
            <Button onClick={() => {
                onRemoveTrip(trip.id)
            }}>
                Cancel
            </Button>
        </td>
    </tr>
);

export default TripItem;