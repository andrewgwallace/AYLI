// import React from "react"
// import { compose, withProps } from "recompose"
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// const MyMapComponent = compose(
//   withProps({
//     googleMapURL:
//       "https://maps.googleapis.com/maps/api/js?key=AIzaSyA3HUPGnMXmJP39ubMsFBVHjX1NNGwjY9A&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props => (
//   <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//     {props.isMarkerShown && (
//       <Marker
//         position={{ lat: -34.397, lng: 150.644 }}
//         onClick={props.onMarkerClick}
//       />
//     )}
//   </GoogleMap>
// ));

// ~~~~~~~~~~~~
import React from "react"
const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");

// Required library to show the marker clusters
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

// Using the compose method component from the recompse library, generate the the properties required for the map element to be displayed
const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA3HUPGnMXmJP39ubMsFBVHjX1NNGwjY9A&v=3.exp&libraries=geometry,drawing,places",
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
  <GoogleMap defaultZoom={3} defaultCenter={{ lat: 25.0391667, lng: 121.525 }}>
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
    {/* Map over each marker and set the key to the photo_id -- This will change to the performance_id, seting the lat and lng to the performance latitude and longitude */}
      {props.markers.map(marker => (
        <Marker
          key={marker.photo_id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

// Establish the component to rendered passing in the state which contains the markers. `markers: data.photos` is an array; you'll pass the array of performances.
class DemoApp extends React.PureComponent {
  componentWillMount() {
    this.setState({ markers: [] })
  }

  componentDidMount() {
    const url = [
      // Length issue
      `https://gist.githubusercontent.com`,
      `/farrrr/dfda7dd7fccfec5474d3`,
      `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
    ].join("")

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ markers: data.photos });
      });
  }

  // Render the state of the markers on the map. 
  render() {
    return (
      <MapWithAMarkerClusterer markers={this.state.markers} />
    )
  }
}

export default DemoApp;










// ~~~~~~~~~~~~~~

// class MyFancyComponent extends React.PureComponent {
//   state = {
//     isMarkerShown: false,
//   }

//   componentDidMount() {
//     this.delayedShowMarker()
//   }

//   delayedShowMarker = () => {
//     setTimeout(() => {
//       this.setState({ isMarkerShown: true })
//     }, 3000)
//   }

//   handleMarkerClick = () => {
//     this.setState({ isMarkerShown: false })
//     this.delayedShowMarker()
//   }

//   render() {
//     return (
//       <MyMapComponent
//         isMarkerShown={this.state.isMarkerShown}
//         onMarkerClick={this.handleMarkerClick}
//       />
//     )
//   }
// }

// export default MyFancyComponent




// import React, { Component } from 'react';
// import './App.css';
// import { compose, withProps } from "recompose"
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// const MyMapComponent = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   withScriptjs,
//   withGoogleMap
// )((props) =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}
//   >
//     {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//   </GoogleMap>
// ))

// <MyMapComponent isMarkerShown />



// class App extends Component {
//   state = {
//     loading: true,
//   }

//   componentDidMount = async () => {
//     const response = await fetch('/api/ping')
//     const json = await response.json()
//     if (json.message) this.setState({ loading: false})
//   }

//   render() {
//     return (
//       <div className="App">
//         {
//           !this.state.loading &&
//           <h1>You've connected to the server!</h1>
//         }
//         </div>
//     );
//   }
// }

// export default App;
