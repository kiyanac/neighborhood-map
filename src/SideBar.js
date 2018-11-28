import React, { Component } from "react";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
//import FourSquare from './API.js';

class SideBar extends Component {
  static propTypes = {
    venues: PropTypes.array.isRequired
  };

  state = {
    search: ""
  };

  onChange = search => {
    this.setState({ search: search });
  };

  render = () => {
    console.log("Props", this.props);
    let showResults;
    if (this.state.search) {
      const match = new RegExp(escapeRegExp(this.state.search), "i");
      showResults = this.props.venues.filter(venue =>
        match.test(venue.venue.name),
                                                   //marker.setVisible(true)
      );
    } else {
      showResults = this.props.venues;
    }

    return (
      <div className="side-bar">
        <div className="search">
          <input
            className="mall-list"
            type="text"
            placeholder="Filter Locations"
            value={this.state.search}
            onChange={event => this.onChange(event.target.value)}
          />
        </div>
        <ol className="mall-list">
          {showResults.map(venue => (
            <li
              key={venue.venue.id}
              className="list-item"
              onClick={() => this.props.listClick(venue)}>
              {venue.venue.name}
            </li>
          ))}
        </ol>
      </div>
    );
  };
}

export default SideBar;
