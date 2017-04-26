import React, {Component} from "react";
import Autosuggest from "react-autosuggest";
import {fetchPlaces} from "./action/place.action";
import {connect} from "react-redux";
import debounce from "lodash/debounce";

import "./PlaceAutocomplete.css";

class Place extends Component {

    suggestions = [];

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.host = props.host;

        this._handleSearch = this._handleSearch.bind(this);
        this.dispatchDebounced = debounce(this.dispatchDebounced, 250);
    }

    _handleSearch(query) {
        if (!query) {
            return;
        }

        this.dispatchDebounced(query)
    }

    dispatchDebounced(query) {
        this.props.dispatch(fetchPlaces(query.value, this.host))
    }

    onChange = (event, {newValue}) => {
        this.setState({
            value: newValue
        });
    };

    render() {
        const places = this.props.places;

        this.suggestions = places[this.host] ? places[this.host].items : [];

        const inputProps = {
            placeholder: 'Type a place',
            value: this.state.value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                suggestions={this.suggestions}
                onSuggestionsFetchRequested={(text) => this._handleSearch(text)}
                onSuggestionsClearRequested={() => {
                    this.suggestions = [];
                }}
                getSuggestionValue={suggestion => suggestion.PlaceName}
                renderSuggestion={suggestion => <span>{suggestion.PlaceName}</span>}
                inputProps={inputProps}
            />
        );
    }
}

const mapStateToProps = (state) => (
    {
        places: state.places
    }
);

export default connect(mapStateToProps)(Place);