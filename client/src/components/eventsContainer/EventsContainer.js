// This container is the wrapper for the other compontents as it contains the primary state and methods.
import React, { Component } from "react";
import ShowMap from '../showMap/ShowMap';
import SearchIndex from "../searchIndex/SearchIndex";
// import ArtistDetails from "../details/ArtistDetails";

class EventsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      currentArtist: null,
      shows: []
    };
  }

  // getArtistStatus = async () => {
  //   const status = await fetch()
  // }


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
      return (
        <div>
          <SearchIndex shows={this.state.shows} />
          <ShowMap shows={this.state.shows} />
          {/* <ArtistDetails currentArtist={this.state.currentArtist} /> */}
        </div>
        )
    }
  }
}

export default EventsContainer;