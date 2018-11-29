import React, { Component } from "react";
import "./Styles.css";
//import FourSquare from './API.js';
import SideBar from "./SideBar";
import axios from "axios";

class App extends Component {
  state = {
    markers: [],
    venues: []
  };
  componentDidMount() {
    this.getLocations();
  }
  //
  showMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBTVFVjqLRQAvF8dRZwr6g-GadDHiXxkF8&callback=initMap"
    );
    window.initMap = this.initMap;
  };

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
            venues: response.data.response.groups[0].items
          },
          this.showMap()
        );
      })
      .catch(error => {
        alert("Did not load " + error);
      });
  };

markerCenter = () => {
  //const { markers } = this.state;
}

  listClick = venue => {
    const { markers } = this.state;
    markers.map(marker => {
      if (venue.venue.name === marker.title) {
         const infoWindow = new window.google.maps.InfoWindow();
        
         const filteredMarkers = [];
        
         const content = `<h1>${venue.venue.name}</h1> \n <p>${
          venue.venue.location.address
          }</p> \n ${venue.venue.photos}`;
        
         infoWindow.setContent(content);
         infoWindow.open(this.map, marker);
         //infoWindow.marker = null;
         //this.openWindow = infoWindow;
         console.log("test");
      }
          return venue;
    });
  };

markerClick = marker => {
  const { venues } = this.state;
  venues.map(venue => {
    if (marker.title === venue.venue.name) {
      console.log("test 2");
    }
    return marker;
  });
};

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
      }</p> \n ${mall.venue.photos}`;
      mall.marker.addListener("click", function() {
        infoWindow.setContent(content);

        infoWindow.open(map, mall.marker);
        //this.markerClick();
      });
      markers.push(mall.marker);
      console.log(mall.marker);
      return mall;
    });
    this.setState({ markers });
  };
  render = () => {
    return (
      <div className="app">
        <SideBar venues={this.state.venues} listClick={this.listClick} markerClick={this.markerClick} />
        <div id="map">
          <div className="title">
            <h1>Dallas Malls</h1>
          </div>
        </div>
      </div>
    );
  };
}

export default App;

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
