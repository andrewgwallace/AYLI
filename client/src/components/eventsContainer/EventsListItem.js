import React, { Component } from "react";
// var datetime = require("node-datetime");

class EventsListItem extends Component {


  render() {
    console.log(this.props.showsAndArtists);
    const { instagram_id, youtube_id, twitter_id, displayName, profileImg, bio } = this.props.details;

    // const {
    //   id, date_time, details
    // } = this.props.item
    // let dt = datetime.create(date_time)
    // let formattedDate = dt.format('m/d/y H:M');
    return <div>
        <img src={profileImg} />
        <h1>{displayName}</h1>
      </div>;
  }
}

export default EventsListItem;
