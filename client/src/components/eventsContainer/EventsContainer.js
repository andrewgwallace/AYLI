// This container is the wrapper for the other compontents as it contains the primary state and methods.
import React, { Component } from "react";
import EventsList from "./EventsList";
import EventDetails from "./EventDetails";
import ShowMap from '../showMap/ShowMap';
import Header from '../header/Header'
import './EventsContainer.css'
const axios = require('axios');
const geolib = require('geolib');

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

    submitSearch = e => {
    const baseURL = "http://localhost:3004"
    e.preventDefault();
    const search = encodeURI(this.state.value);
    axios.get(`${baseURL}/search?s=${search}`)
      .then( response => {
        // Get search points from API call into an array
        const searchPoints = response.data.map(result => {
          return { lat: parseFloat(result.lat), lon: parseFloat(result.lon), boundingbox: parseFloat(result.boundingbox) };
        })
        console.log(searchPoints)
        const events = this.state.showsAndArtists;
        //Grab event points from state
        const eventPoints = events.map(event => {
          return { lat: parseFloat(event.lat), lon: parseFloat(event.lng)}
        })
        console.log(eventPoints)
        console.log(
            geolib.isPointInCircle(
            { latitude: eventPoints[2].lat, longitude: eventPoints[2].lon },
            { latitude: eventPoints[0].lat, longitude: eventPoints[0].lon },
              // { latitude: searchPoints[3].lat, longitude: searchPoints[3].lon },
              1609 // Approx 1 mile in kilometers (Find events within one mile of respective lat/long of search)
            ))
          }
        )

        // Pass each search point to see what events are within a 1 mile radius of it
        // searchPoints.(point => { searchPoints.map(location => {
          // geolib.isPointInCircle(point, {latitude: location.lat, longitude: location.lon},
          //   1609))// Approx 1 mile in kilometers (Find events within one mile of respective lat/long of search)
          // })
        // })
      // })
};

  render() {
    if (this.state.loading) {
      return null
    } else {
      const currentEvent = this.state.showsAndArtists.find((show) => show.id === this.state.currentEvent)
      return <div>
        <div className="header">
          <Header search={this.submitSearch} />
        </div>
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