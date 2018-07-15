import React from "react";
import React, { Component } from 'react';

import './App.css'


const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} = require("react-google-maps");

// Required library to show the marker clusters
const {
  MarkerClusterer
} = require("react-google-maps/lib/components/addons/MarkerClusterer");
// const {
//   MarkerWithLabel
// } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

// Using the compose method component from the recompse library, generate the the properties required for the map element to be displayed

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA3HUPGnMXmJP39ubMsFBVHjX1NNGwjY9A&v=3.exp&libraries=geometry,drawing,places", //removed `,places` after drawing'
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  // Handler functions that act in response to synthetic events occurring in React.
  // DOCUMENTATION: https://recompose.docsforhumans.com/withhandlers.html These functions are passed as immmutable props (they don't change)
  withHandlers({
    onMarkerClustererClick: () => markerClusterer => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    }
  }),
  withScriptjs,
  withGoogleMap
  // "props" here is a name simply given (could have been called anything) to identify the withProps that were provided for the Marker Cluster that pass the required info by Google Maps; the defaultZoom and defaultCenter.
)(props => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: 40.755977, lng: -73.986988 }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.shows.map(show => (
        <Marker
          key={show.id}
          position={{
            lat: parseFloat(show.lat),
            lng: parseFloat(show.lng)
          }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

// THE MAIN APP COMPONENT
// Establish the component to rendered passing in the state which contains the markers. `markers: data.photos` is an array; you'll pass the array of performances.
class ShowMap extends React.PureComponent {

  componentWillMount() {
    this.setState({
      shows: []
    });
  }

  componentDidMount = async () => {
    const showsResponse = await fetch("http://localhost:3004/api/shows")
    const json = await showsResponse.json()
    if (json.shows) {
      this.setState({ loading: false, shows: json.shows });
      console.log(this.state.shows);
    }
  };

  // Render the state of the markers on the map.

  render() {
    return (
        <div>
          <MapWithAMarkerClusterer shows={this.state.shows} />
        </div>
    );
  }
}

export default ShowMap;