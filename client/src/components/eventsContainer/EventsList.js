import React, { Component } from 'react';
import EventsListItem from './EventsListItem'
import {List, Avatar} from 'antd';
import FormItem from '../../../../node_modules/antd/lib/form/FormItem';
const datetime = require("node-datetime");

class EventsList extends Component {
  
  render() {
  // const { start_time, end_time, artistImg } = this.props.nearbyEvents

    // let st = datetime.create(results.start_time);
    // let et = datetime.create(results.end_time);
    // let formattedStart = st.format("I:M p");
    // let formattedEnd = et.format("I:M p");
    
    const results = this.props.nearbyEvents;
    // const results = this.props.submitSearch
    if (!results) {
      return "No performers found. :("
    } else {
      return <List style={{ width: "80%" }} itemLayout="horizontal" dataSource={results} renderItem={item => {
        let status = "";
        const startTimeSeconds = new Date(item.start_time).getTime();
        const endTimeSeconds = new Date(item.end_time).getTime();
        const now = Date.now();

        console.log(startTimeSeconds, endTimeSeconds, now);

        if (startTimeSeconds < now && now < endTimeSeconds) {
          status = "Performing now!";
        } else {
          status = `Starts: ${datetime.create(item.start_time).format("f d, I:M p")}`;
        }
        console.log(status);

        return (
          <List.Item onClick={() => this.props.updateCurrentEvent(item.id)}>
            <List.Item.Meta
              avatar={<Avatar src={item.artistImg} />}
              title={item.artist}
              description={`${status} Until: ${datetime.create(item.end_time).format("I:M p")}`}
            />
          </List.Item>
        )
      }} />;
    }
  }
}

export default EventsList;