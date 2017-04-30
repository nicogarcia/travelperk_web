import React from "react";
import {Button} from "reactstrap";

const TripItem = ({trip, onRemoveTrip}) => (
    <tr>
        <td>{trip.id}</td>
        <td>{trip.name}</td>
        <td>
            <Button onClick={() => {
                onRemoveTrip(trip.id)
            }}>
                Remove
            </Button>
        </td>
    </tr>
);

export default TripItem;