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
    state = {
      loading: true,
      currentEvent: null,
      showsAndArtists: [],
      search: 'Enter an address'
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

    // findResults = (eventPoints, searchPoints) => {
    //   let results = [];
    //   let lastEvent = eventPoints => {
    //     return eventPoints[eventPoints.length - 1];
    //   };
    //   let remainingSearchPoints = searchPoints => {
    //     return searchPoints.slice(searchPoints[0], -1);
    //   };
    //   if (searchPoints.length === 0) {
    //     return []
    //   }
    //   if (geolib.isPointInCircle(lastEvent, searchPoints[0, -1], 1609)) {
    //     return lastEvent
    //   } else {
    //     console.log('Nope.')
    //   }
    // }



    submitSearch = (e) => {
      e.preventDefault();
      const baseURL = "http://localhost:3004"
      const query = encodeURI(this.state.search)
      console.log(`${baseURL}/search?s=${query}`);
    axios.get(`${baseURL}/search?s=${query}`)
      .then( response => {
        // Get search points from API call into an array
        const searchPoints = response.data.map(result => {
          return { latitude: parseFloat(result.lat), longitude: parseFloat(result.lon)};
        })
        console.log(searchPoints)
        const events = this.state.showsAndArtists;
        //Grab event points from state
        const eventPoints = events.map(event => {
          return {latitude: parseFloat(event.lat), longitude: parseFloat(event.lng)}
        })
        console.log(eventPoints)
        let testEvent = { latitude: 40.755977, longitude: -73.986988 }
        let testLocation = { latitude: 40.741895, longitude: -73.989308 };

        for (let i = 0; i < searchPoints.length; i++) {
        let location = searchPoints[i];
          console.log(location)
        }

        // let results = eventPoints.filter(event => {
          
        // })
        // console.log(results);
        


        // return cats.filter(function (cat) {
        //   return filtersArray.indexOf(cat) > -1;
        // }).length === filtersArray.length;

        console.log(geolib.isPointInCircle(
          testEvent, testLocation, 1609)
        )

          //GEOLIB Library: It takes three arguments, 1: the value to check, 2: the value to check against, 3: the distance in km. It returns 'true' or 'false'.
          // let results = eventPoints.filter(point => {
          //   for (let i = 0; i < searchPoints.length; i++) {
          //     geolib.isPointInCircle(point, searchPoints[i], 2000)
          //   }
          // })
      }
    )

     /*, boundingbox: parseFloat(result.boundingbox)*/


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
          <Header search={this.submitSearch} updateSearch={this.updateSearch} currentSearch={this.state.search}/>
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