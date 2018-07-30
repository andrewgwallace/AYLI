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
      search: '',
      currentUser: null
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
    const baseURL = "http://localhost:3004";
    const location = await this.getLocation();
    // const query = encodeURI(this.state.search)
  axios
    .get(`${baseURL}/search?s=${location}`)
    .then(response => {
      const userLocation = {latitude: response.data[0].lat, longitude: response.data[0].lon}
      // Get search points from API call into an array
      // .map(result => {
      //   return { latitude: parseFloat(result.lat), longitude: parseFloat(result.lon) };
      // });
      const events = this.state.showsAndArtists;
      //Grab event points from state
      const eventPoints = events.map(event => {
        return { latitude: parseFloat(event.lat), longitude: parseFloat(event.lng) };
      });
        let results = eventPoints.filter(event => {
          return geolib.isPointInCircle(event, userLocation, 1609);
        });
        console.log(results);
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
              <Col span={6}>
                <EventDetails currentEvent={currentEvent} />
              </Col>
              <Col span={6}>
                <EventsList showsAndArtists={this.state.showsAndArtists} updateCurrentEvent={this.updateCurrentEvent} />
              </Col>

              <Col span={12}>
                <ShowMap shows={this.state.showsAndArtists} currentEvent={currentEvent} updateCurrentEvent={this.updateCurrentEvent} />
              </Col>
            </Row>
          </Content>
        </div>;
    }
  }
}

export default EventsContainer;