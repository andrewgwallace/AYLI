// This container is the wrapper for the other compontents as it contains the primary state and methods.
import React, { Component } from "react";
import Twitter from "../twitter/Twitter"; 
import ShowMap from '../showMap/ShowMap'

class EventsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isAuthenticated: false,
      user: null,
      token: "",
      shows: []
    };
  }

  componentDidMount = async () => {
    //Get all shows
    const showsResponse = await fetch("api/shows")
    const shows = await showsResponse.json()
    if (shows) {
      this.setState({ loading: false, shows: shows });
    }
  };

  render() {
    if (this.state.loading) {
      return null
    } else {
      return <div>
          <ShowMap shows={this.state.shows} />
          <Twitter />
        </div>;
    }
  }
}

export default EventsContainer;