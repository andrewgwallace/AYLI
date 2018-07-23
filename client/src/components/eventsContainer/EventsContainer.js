// This container is the wrapper for the other compontents as it contains the primary state and methods.
import React, { Component } from "react";
import EventsList from "./EventsList";
import ShowMap from '../showMap/ShowMap';
import './EventsContainer.css'

// import ArtistDetails from "../details/ArtistDetails";

class EventsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      currentArtist: null,
      showsAndArtists: []
    };
  }

  // getArtistStatus = async () => {
  //   const status = await fetch()
  // }


  componentDidMount = async () => {
    //Get all shows and artist name and image.
    const response = await fetch("api/shows");
    const data = await response.json()
    if (data) {
      this.setState({ loading: false, showsAndArtists: data });
    }
  };

  render() {
    if (this.state.loading) {
      return null
    } else {
      return (
        <div>
          <div className="details"><p>Details</p></div>
          <div className="eventsList">
            <EventsList showsAndArtists={this.state.showsAndArtists} />
          </div>
          <div className="eventsMap">
            <ShowMap shows={this.state.showsAndArtists} />
          </div>
          {/* <ArtistDetails artistDetails={this.state.showsAndArtists} /> */}
        </div>
        )
    }
  }
}

export default EventsContainer;