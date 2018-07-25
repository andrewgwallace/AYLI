// This container is the wrapper for the other compontents as it contains the primary state and methods.
import React, { Component } from "react";
import EventsList from "./EventsList";
import EventDetails from "./EventDetails";
import ShowMap from '../showMap/ShowMap';
import './EventsContainer.css'

// import ArtistDetails from "../details/ArtistDetails";

class EventsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      currentEvent: null,
      showsAndArtists: []
    };
  }

  updateCurrentEvent = (currentEvent) => {
    this.setState ({
      currentEvent
    })
  }

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
      const currentEvent = this.state.showsAndArtists.find((show) => show.id === this.state.currentEvent)
      return <div>
          <div className="eventDetails">
            <EventDetails currentEvent={currentEvent} />
          </div>
          <div className="eventsList">
            <EventsList showsAndArtists={this.state.showsAndArtists} updateCurrentEvent={this.updateCurrentEvent} />
          </div>
          <div className="eventsMap">
            <ShowMap shows={this.state.showsAndArtists} currentEvent={currentEvent} updateCurrentEvent={this.updateCurrentEvent} />
          </div>
          {/* <ArtistDetails artistDetails={this.state.showsAndArtists} /> */}
        </div>;
    }
  }
}

export default EventsContainer;