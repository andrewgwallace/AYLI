import React, { Component } from 'react';
import EventsListItem from './EventsListItem'
import {List, Avatar} from 'antd';

class EventsList extends Component {
  

  render() {
    const results = this.props.showsAndArtists
    // const results = this.props.submitSearch
    if(!results) {
      return null
    } else {
      console.log(results)
    // const eventDetails = results.map(details => {
    //   return 
    //   <EventsListItem key={details.id} details={details} updateCurrentEvent={this.props.updateCurrentEvent} results={this.results} />;
    // });
    return (
      <List
        style={{ width: '80%' }}
        itemLayout="horizontal"
        dataSource={results}
        renderItem={item => (
          <List.Item onClick={() => this.props.updateCurrentEvent(item.id)}>
            <List.Item.Meta
              avatar={<Avatar src={item.profileImg}/>}
              title={item.displayName}
            />
        </List.Item>
      )}
      />
     ) 
    }
  }
}

export default EventsList;
