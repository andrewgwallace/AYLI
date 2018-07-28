// This container is the wrapper for the other compontents as it contains the primary state and methods.
import React, { Component } from "react";
import EventsList from "./EventsList";
import EventDetails from "./EventDetails";
import ShowMap from '../showMap/ShowMap';
import HeaderComponent from '../header/Header'
import './EventsContainer.css'
import { Layout } from 'antd';
const axios = require('axios');
const geolib = require('geolib');
const {Content } = Layout;

// import ArtistDetails from "../details/ArtistDetails";

class EventsContainer extends Component {
    state = {
      loading: true,
      currentEvent: null,
      showsAndArtists: [],
      search: ''
    };


  updateCurrentEvent = (currentEvent) => {
    this.setState ({
      currentEvent
    })
  }

  updateSearch = (attribute, value) => {
    this.setState(
      { ...this.state.search, [attribute]: value  }
    )
  }


  componentDidMount = async () => {
    //Get all shows and artist name and image.
    const response = await fetch("api/shows");
    const data = await response.json()
    if (data) {
      this.setState({ loading: false, showsAndArtists: data });
    }
  };

  submitSearch = () => {
    // e.preventDefault();
    const baseURL = "http://localhost:3004"
    const query = encodeURI(this.state.search)
    // console.log(`${baseURL}/search?s=${query}`);
  axios.get(`${baseURL}/search?s=${query}`)
    .then( response => {
      // Get search points from API call into an array
      const searchPoints = response.data.map(result => {
        return { latitude: parseFloat(result.lat), longitude: parseFloat(result.lon)};
      })
      // console.log(searchPoints)
      const events = this.state.showsAndArtists;
      //Grab event points from state
      const eventPoints = events.map(event => {
        return {latitude: parseFloat(event.lat), longitude: parseFloat(event.lng)}
      })

      for (let i=0; i < searchPoints.length; i++) {
        console.log(searchPoints[i])
        let results = eventPoints.filter(event => {
          console.log(event);
          geolib.isPointInCircle(event, searchPoints[i], 5000);
      })
      console.log(results)
    }
  })
};

  render() {
    if (this.state.loading) {
      return null
    } else {
      const currentEvent = this.state.showsAndArtists.find((show) => show.id === this.state.currentEvent)
      return (
        <div className="headerAndContent">
          <Content>
          <HeaderComponent search={this.submitSearch} updateSearch={this.updateSearch} currentSearch={this.state.search}/>
          <EventDetails currentEvent={currentEvent} />
          <EventsList showsAndArtists={this.state.showsAndArtists} updateCurrentEvent={this.updateCurrentEvent} />
          <ShowMap shows={this.state.showsAndArtists} currentEvent={currentEvent} updateCurrentEvent={this.updateCurrentEvent} />
        </Content>
      </div>

      )
    }
  }
}

export default EventsContainer;