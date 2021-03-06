import React, {Component} from "react";
import Autosuggest from "react-autosuggest";
import {fetchPlaces} from "./PlaceAutocomplete.action";
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

        // TODO: Improve this? Does it have an undesired behaviour?
        this.dispatchDebounced = debounce(this.dispatchDebounced, 250);
    }

    handleSearch = (query) => {
        if (!query || query.value.length < 2) {
            return;
        }

        this.dispatchDebounced(query)
    };

    dispatchDebounced(query) {
        this.props.dispatch(fetchPlaces(query.value, this.host))
    }

    onChange = (event, {newValue}) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionSelected = (event, {suggestion}) => {
        this.props.onSelected && this.props.onSelected(suggestion);
    };

    render() {
        const hostPlaces = this.props.places[this.host];

        this.suggestions = (hostPlaces && hostPlaces.items) || [];

        const inputProps = {
            placeholder: 'Type a place',
            value: this.state.value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                suggestions={this.suggestions}
                onSuggestionSelected={this.onSuggestionSelected}
                onSuggestionsFetchRequested={(text) => this.handleSearch(text)}
                onSuggestionsClearRequested={() => {
                    this.suggestions = [];
                }}
                getSuggestionValue={suggestion => suggestion.PlaceName}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />
        );
    }

    renderSuggestion(suggestion) {
        return (
            <div className={suggestion.HasCity ? 'suggestion airportWithCity' : 'suggestion'}>
                <div className="suggestion__icon">
                    {
                        suggestion.IsCity ?
                            <i className="fa fa-building-o fa-2x" aria-hidden="true"></i> :
                            <i className="fa fa-plane fa-2x" aria-hidden="true"></i>
                    }
                </div>
                <div className="suggestion-container">
                    <div className="suggestion__place-name">
                        {suggestion.PlaceName}
                    </div>
                    <div className="suggestion__country">
                        {suggestion.CountryName}
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => (
    {
        places: state.places
    }
);

export default connect(mapStateToProps)(Place);