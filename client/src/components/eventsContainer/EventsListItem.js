import React, { Component } from "react";
// var datetime = require("node-datetime");

class EventsListItem extends Component {


  render() {
    // console.log(this.props.showsAndArtists);
    const { id, instagram_id, youtube_id, twitter_id, displayName, profileImg, bio } = this.props.details;
    // console.log(profileImg.replace(/(_normal)/g, "_400x400"))
    // const {
    //   id, date_time, details
    // } = this.props.item
    // let dt = datetime.create(date_time)
    // let formattedDate = dt.format('m/d/y H:M');
    return (
      <div className="itemDetails" 
            onClick={() => this.props.updateCurrentEvent(id)}>
        <img src={profileImg}/>
        <h2>{displayName}</h2>
      </div>
    )
  }
}

export default EventsListItem;
