import React, { Component } from "react";
import {List, Avatar} from 'antd';
// var datetime = require("node-datetime");

class EventsListItem extends Component {


  render() {
    const { id, instagram_id, youtube_id, twitter_id, displayName, profileImg, bio } = this.props.details;
 
    return <List.Item onClick={() => this.props.updateCurrentEvent(id)}>
        <List.Item.Meta avatar={<Avatar src={profileImg} />} title={displayName} />
      </List.Item>;
  }
}

export default EventsListItem;


   // console.log(profileImg.replace(/(_normal)/g, "_400x400"))
    // const {
    //   id, date_time, details
    // } = this.props.item
    // let dt = datetime.create(date_time)
    // let formattedDate = dt.format('m/d/y H:M');
