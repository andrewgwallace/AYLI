import React, { Component } from "react";
import MapWithAMarkerClusterer from "./MapWithAMarkerClusterer";
const {
  Marker
} = require("react-google-maps");

class ShowMap extends Component {       
  constructor(props) {
    super(props)
  }
  
  render() {
    if (!this.props.shows) {
      return null
    } else {
      const showList = this.props.shows.map(show => {
        return(
          <Marker
            key={show.id}
            position={{
              lat: parseFloat(show.lat),
              lng: parseFloat(show.lng)
            }}
          />
        );
      })
      // console.log(this.props.shows);
      return (
        <div>
          <MapWithAMarkerClusterer shows={showList} />
        </div>
      )
    }
  }           
}

export default ShowMap;