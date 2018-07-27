import React, { Component } from "react";
const fetch = require("isomorphic-fetch");
const _ = require("lodash");
const { compose, withProps, withHandlers, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
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
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
//~~~~~~~~~~~~~~~~~~~~~~
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  //~~~~~~~~~~~~~~~~~~~~
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
    defaultZoom={13}
    defaultCenter={{ lat: 40.755977, lng: -73.986988 }}
  >
    <MarkerClusterer

      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.shows}
      {/* {props.searchResults} */}
    </MarkerClusterer>
  </GoogleMap>
));

export default MapWithAMarkerClusterer;