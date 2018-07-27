import React, { Component } from 'react';
import EventsListItem from './EventsListItem'


class EventsList extends Component {
  

  render() {
    // const results = this.props.showsAndArtists
    const results = this.props.submitSearch
    if(!results) {
      return null
    } else {
    // console.log(this.props.submitSearch)
    // Map over each event and pass it's lat/lon into a map over of each value from the search result that runs the geolib function.
    //If evaluates to true, pass the matching events into a new array and pass that array to the EventListItem component.

    const eventDetails = results.map(details => {
      return <EventsListItem key={details.id} details={details} updateCurrentEvent={this.props.updateCurrentEvent} results={this.results} />;
    });
    return eventDetails;
    }
  }
}

export default EventsList;
