import React from "react";
import {Button} from "reactstrap";

const TripItem = ({trip, onRemoveTrip}) => (
    <div>
        {trip.id} - {trip.text}
        <Button onClick={() => {
            onRemoveTrip(trip.id)
        }}>Remove</Button>
    </div>
);

export default TripItem;