import React from "react";
import {Button} from "reactstrap";

const TripDetail = ({trip, onRemoveTrip}) => (
    <tr>
        <td>{trip.id}</td>
        <td>{trip.name}</td>

        {/* TODO: Fix these dirty transforms */}
        <td>
            {
                (trip.from_place && trip.from_place.replace('-sky', '')) || '-'
            }
        </td>
        <td>
            {
                (trip.to_place && trip.to_place.replace('-sky', '')) || '-'
            }
        </td>

        <td>
            <Button onClick={() => onRemoveTrip(trip.id)}>
                Remove
            </Button>
        </td>
    </tr>
);

export default TripDetail;