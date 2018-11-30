import React, { Component } from "react";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
//import Drawer from '@material-ui/core/Drawer'; doug brown 28:00
// return filtered list Help from: drunkenkismet

class SideBar extends Component {
  static propTypes = {
    venues: PropTypes.array.isRequired
  };

  state = {
    search: "",
    open: false
  };

  onChange = search => {
   const markers = this.props.markers;
   markers.forEach(marker => {
   marker.name.toLowerCase().includes(search.toLowerCase()) === true ?
   marker.setVisible(true) :
   marker.setVisible(false)
    });
    this.setState({ search: search });
  };

  render = () => {
    //Help from: Udacity Classroom
    console.log("Props", this.props);
    let showResults;
    if (this.state.search) {
      const match = new RegExp(escapeRegExp(this.state.search), "i");
      showResults = this.props.venues.filter(venue =>
        match.test(venue.venue.name)
                                                   
      );
    } else {
      showResults = this.props.venues;
    }

    return (
      <div className="side-bar">
        <div className="search" aria-label="search">
          <input
            className="mall-list"
            type="text"
            placeholder="Filter Locations"
            value={this.state.search}
            onChange={event => this.onChange(event.target.value)}
          />
        </div>
        <ol className="mall-list" aria-label="list">
          {showResults.map(venue => (
            <li
              key={venue.venue.id}
              className="list-item"
              onClick={() => this.props.listClick(venue)}
              tabIndex="0">
              {venue.venue.name}
            </li>
          ))}
        </ol>
      </div>
    );
  };
}

export default SideBar;
