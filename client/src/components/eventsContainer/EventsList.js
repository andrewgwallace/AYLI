import React, { Component } from 'react';
import EventsListItem from './EventsListItem'


class EventsList extends Component {

  render() {
    const showsAndArtists = this.props.showsAndArtists;
    
    if (!showsAndArtists) {
      return null
    } else {
      console.log(showsAndArtists);
      const ArtistDetails = showsAndArtists.map(details => {
        return (
          <EventsListItem key={details.id} details={details} />
        );
      });
      return (
        ArtistDetails
      )
    }
  }
}

export default EventsList;
