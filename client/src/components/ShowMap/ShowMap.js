import React, { Component } from "react";
import MapWithAMarkerClusterer from "./MapWithAMarkerClusterer";
import SearchBox from "../header/SearchBox";
const {
  Marker
} = require("react-google-maps");


class ShowMap extends Component {       
 
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
          <MapWithAMarkerClusterer shows={showList} searchResults={this.props.searchResults} />
        </div>
      )
    }
  }           
}

export default ShowMap;

// onClick = {() => this.props.updateCurrentEvent(id)}


