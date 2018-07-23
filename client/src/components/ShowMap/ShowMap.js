import React, { Component } from "react";
import MapWithAMarkerClusterer from "./MapWithAMarkerClusterer";
const {
  Marker
} = require("react-google-maps");

class ShowMap extends Component {       
  // constructor(props) {
  //   super(props)
  // }
  
  render() {
    
    const shows = this.props.shows;
    if (!shows) {
      return null
    } else {
      const showList = shows.map(show => {
        return(
          <Marker
            onClick={() => this.props.updateCurrentEvent(show.id)}
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

// onClick = {() => this.props.updateCurrentEvent(id)}