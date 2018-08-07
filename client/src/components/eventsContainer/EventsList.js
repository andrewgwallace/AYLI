import React, { Component } from 'react';
import {List, Avatar} from 'antd';
const datetime = require("node-datetime");


class EventsList extends Component {

  
  render() {

    const results = this.props.nearbyEvents;

    if (!results) {
      return "No performers found. :("
    } else {
      return <List style={{ width: "80%" }} itemLayout="horizontal" dataSource={results} renderItem={item => {
        let status = "";
        const startTimeSeconds = new Date(item.start_time).getTime();
        const endTimeSeconds = new Date(item.end_time).getTime();
        const now = Date.now();

        if (startTimeSeconds < now && now < endTimeSeconds) {
          status = "Performing now!";
        } else {
          status = `Starts: ${datetime.create(item.start_time).format("f d, I:M p")}`;
        }

        return <List.Item onClick={() => this.props.updateCurrentEvent(item.id)}>
            <List.Item.Meta avatar={<Avatar src={item.artistImg} />} title={item.artist} description={`${status} Until: ${datetime
                .create(item.end_time)
                .format("I:M p")}`} />
          </List.Item>;
      }} />;
    }
  }
}

export default EventsList;