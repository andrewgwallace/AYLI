import React, { Component } from 'react';

class EventDetails extends Component {

  render() {
    const eventDetails = this.props.currentEvent
    if (!eventDetails) {
      return (
        <div>
          <p>
            Please select an artist from the list.
          </p>
        </div>
      )
    } else {
      return (
        <div>
          <img src={eventDetails.profileImg}/>
          <h1>{eventDetails.displayName}</h1>
          <p>{eventDetails.details}</p>
          
        </div>
      )
    }
    // const { instagram_id, youtube_id, twitter_id, displayName, profileImg, bio } = this.props.artistDetails
  }
}

export default EventDetails;



// <div>
//   <img src={profileImg}></img>
//   <h2>{displayName}</h2>
//   <h3>{twitter_id}</h3>
//   if ({youtube_id}) {
//     <h3>{youtube_id}</h3>
//   }
//   if ({instagram_id}) {
//     <h3>{instagram_id}</h3>
//   }
// </div>