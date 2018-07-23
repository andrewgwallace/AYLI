import React, { Component } from "react";
const { compose, withProps, withHandlers, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} = require("react-google-maps");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const demoFancyMapStyles = require("./demoFancyMapStyles.json");
const {
  MarkerClusterer
} = require("react-google-maps/lib/components/addons/MarkerClusterer");
class ShowMap extends Component {
if (!this.props.shows) {
  return null
} else {
  
const StyledMapWithAnInfoBox = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA3HUPGnMXmJP39ubMsFBVHjX1NNGwjY9A&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 25.03, lng: 121.6 }
  }),
  withHandlers({
    onMarkerClustererClick: () => markerClusterer => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    }
  }),
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={5}
    defaultCenter={props.center}
    defaultOptions={{ styles: demoFancyMapStyles }}
  >
    <InfoBox
      defaultPosition={{ lat: 40.755977, lng: -73.986988 }}
      options={{ closeBoxURL: ``, enableEventPropagation: true }}
    >
      <div
        style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}
      >
        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
          Hello, Taipei!
        </div>
      </div>
    </InfoBox>
    <Marker
      key={show.id}
      position={{
        lat: parseFloat(show.lat),
        lng: parseFloat(show.lng)
      }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && (
        <InfoBox
          onCloseClick={props.onToggleOpen}
          options={{ closeBoxURL: ``, enableEventPropagation: true }}
        >
          <div
            style={{
              backgroundColor: `yellow`,
              opacity: 0.75,
              padding: `12px`
            }}
          >
            <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
              Hello, Kaohsiung!
            </div>
          </div>
        </InfoBox>
      )}
    </Marker>
  </GoogleMap>
));
  }


  render() {
      return (
        <StyledMapWithAnInfoBox />
      )
    }
  }

  export default ShowMap;