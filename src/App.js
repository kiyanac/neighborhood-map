import React, { Component } from "react";
import "./Styles.css";
import SideBar from "./SideBar";
import Heading from "./Heading"; 
import axios from "axios";

class App extends Component {
  state = {
    markers: [],
    showResults: [],
    venues: [],
    map: null,
    infoWindow: null,
    open: false
  };

  componentDidMount() {
    this.getLocations();
  }
  
styles = {
    menuButton: {
      marginLeft: 10,
      position: "absolute",
      left: 10,
      top: 20,
      padding: 10,
      borderRadius: 5
    },
    hide: {
      display: 'none'
    },
    header: {
      marginTop: "0px"
    }
  };

toggleMenu = () => {
    this.setState({
      open: !this.state.open
    });
  console.log("open");
  }

  showMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBTVFVjqLRQAvF8dRZwr6g-GadDHiXxkF8&callback=initMap"
    );
    window.initMap = this.initMap;
  };
// Get API data Help from: Forrest Walker
  getLocations = search => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "RJYPCQBRP0DWTBJOOI00AP2L2ZSP5HWG0UJUL2ADLNUVERQX",
      client_secret: "05FGCTAGUVT1KEARFJQM3KZ0NVHLIZG4S211AMHGIQXEVIDQ",
      v: "20181113",
      near: "Dallas, TX",
      query: "mall",
      limit: 5
    };

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState(
          {
            venues: response.data.response.groups[0].items,
            markers: response.data.response.groups[0].items
          },
          this.showMap()
        );
      })
      .catch(error => {
        alert("Did not load " + error);
      });
  }; //
// listClick Help from: drunkenkismet
  listClick = venue => {
    const { markers, map, infoWindow } = this.state;
    markers.map(marker => {
      if (venue.venue.name === marker.title) {
        const content = `<h1>${venue.venue.name}</h1> \n <p>${
          venue.venue.location.address
        }</p>`;

        infoWindow.setContent(content);
        infoWindow.open(map, marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 1125);
      }
      return venue;
    });
  };

 /* markerClick = marker => {
    const { venues } = this.state;
    venues.map(venue => {
      if (marker.title === venue.venue.name) {
        console.log("test 2");
      }
      return marker;
    });
  }; */
// Map set up Help from: Udacity Classroom lessons/Yahya Elharony
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 32.7767, lng: -96.797 },
      zoom: 12
    });

    const infoWindow = new window.google.maps.InfoWindow();

    const markers = [];
    this.state.venues.forEach(mall => {
      const position = {
        lat: mall.venue.location.lat,
        lng: mall.venue.location.lng
      };

      mall.marker = new window.google.maps.Marker({
        position,
        map: map,
        id: mall.id,
        animation: window.google.maps.Animation.DROP,
        title: mall.venue.name
      });
      const content = `<h1>${mall.venue.name}</h1> \n <p>${
        mall.venue.location.address
      }</p>`;
      
      mall.marker.addListener("click", function() {
        infoWindow.setContent(content);

        infoWindow.open(map, mall.marker);
      });
      markers.push(mall.marker);
      return mall;
    });
    this.setState({ markers, map, infoWindow });
  };

  render = () => {
    return (
      <div className="app">
      <button onClick={this.toggleMenu} style={this.styles.menuButton}>
            <i className="fa fa-bars">X</i>
          </button>
        <SideBar
          venues={this.state.venues}
          listClick={this.listClick}
          open={this.state.open}
          toggleMenu={this.toggleMenu}
        />
        <Heading />
        <div id="map" role="application" aria-label="map">
        </div>
      </div>
    );
  };
}

export default App;

//Help from: Forrest Walker
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
