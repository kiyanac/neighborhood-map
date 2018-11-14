import React, {Component} from 'react';
import './Styles.css';
import FourSquare from './API.js';
//import axios from 'axios';

class App extends Component {
  state = {
    markers: [],
    venues: []
  }
componentDidMount() {
     this.showMap()
  FourSquare.search({
    near:"Dallas, TX",
    query:"mall"
  }).then(results => console.log(results));
  }

showMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBTVFVjqLRQAvF8dRZwr6g-GadDHiXxkF8&callback=initMap");
    window.initMap = this.initMap
  }

initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 32.7767, lng: -96.7970 },
            zoom: 12
        });
  		/*
  		for(let i = 0; i < venues.length; i++) {
          const position = venues[i].location;
          const title = venues[i].title;
        } */
  		this.state.venues.map(mall => {
          const marker = new window.google.maps.Marker({
          position: {lat: mall.venue.location.lat, lng: mall.venue.location.lat},
          //position: {lat: response.venues.location.lat, lng: response.venues.location.lng}
          animation: window.google.maps.Animation.DROP,
          map: map,
          title: 'First Marker!'
        });
  		//const mall = access foursqare data
  		//Add it to venues: []
  		//this.state.venues.push(marker);
  		this.state.markers.push(marker)
      //console.log(this.state.markers)
  
  		const infoWindow = new window.google.maps.InfoWindow({
          content:'hello'
        });
  		marker.addListener('click', function() {
          infoWindow.open(map, marker);
        })
          return mall;
        })
 		
}
  render = () => {
   
    return (
      <div className="app">
        <div>
          <h1>Dallas Malls</h1>
        </div>
      <div id="map">

</div>
      
      </div>
    );
  }
}

export default App;

function loadScript(url){
      var index = window.document.getElementsByTagName("script")[0];
      var script = window.document.createElement("script");
     script.src = url;
     script.async = true;
     script.defer = true; 
     index.parentNode.insertBefore(script, index)
    };
