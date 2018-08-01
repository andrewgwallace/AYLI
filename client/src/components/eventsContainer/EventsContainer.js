// This container is the wrapper for the other compontents as it contains the primary state and methods.
import React, { Component } from "react";
import EventsList from "./EventsList";
import EventDetails from "./EventDetails";
import ShowMap from '../showMap/ShowMap';
import HeaderComponent from '../header/Header'
import './EventsContainer.css'
import { Row, Col, Layout } from 'antd';
import { callbackify } from "util";
const axios = require('axios');
const geolib = require('geolib');
const { Content } = Layout;


class EventsContainer extends Component {
    state = {
      loading: true,
      currentEvent: null,
      showsAndArtists: [],
      searchResults: []
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

  getLocation = () => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(
          `${position.coords.latitude}+${position.coords.longitude}`
        );
      }, () => {
        resolve(fetch('https://ipapi.co/json')
          .then(res => res.json())
          .then(location => {
            return `${location.latitude}+${location.longitude}`
          }));
      });
    });
  }

  submitSearch = async () => {
    // const baseURL = "http://localhost:3004";
    const baseURL = "https://immense-savannah-75072.herokuapp.com";
    const location = await this.getLocation();
    // const query = encodeURI(this.state.search)
  axios
    .get(`${baseURL}/search?s=${location}`)
    .then(response => {
      const userLocation = {latitude: parseFloat(response.data[0].lat), longitude: parseFloat(response.data[0].lon)}
      const events = this.state.showsAndArtists;
      const eventPoints = events.map(event => {
        return {location: { 
          latitude: parseFloat(event.lat), 
          longitude: parseFloat(event.lng)},
          id: event.id,
          artist: event.displayName,
          artistImg: event.profileImg,
          start_time: event.start_date_time,
          end_time: event.end_time
        };
      });
      let results = eventPoints.filter(event => {
        const isIn = geolib.isPointInCircle(event.location, userLocation, 20000);
        return isIn;
      });
        this.setState({
          searchResults: results
        })
    });
};

  render() {
    if (this.state.loading) {
      return null
    } else {
      const currentEvent = this.state.showsAndArtists.find((show) => show.id === this.state.currentEvent)
      return <div className="headerAndContent">
          <Content>
            <HeaderComponent search={this.submitSearch} updateSearch={this.updateSearch} currentSearch={this.state.search} />
          <Row>
              <Col align="center" span={6}>
                <EventDetails currentEvent={currentEvent} />
              </Col>
            <Col span={6}>
              <EventsList nearbyEvents={this.state.searchResults} updateCurrentEvent={this.updateCurrentEvent} />
            </Col>
              
            <Col span={12}><ShowMap shows={this.state.showsAndArtists} currentEvent={currentEvent} updateCurrentEvent={this.updateCurrentEvent} /></Col>
              
            </Row>
          </Content>
        </div>;
    }
  }
}

export default EventsContainer;